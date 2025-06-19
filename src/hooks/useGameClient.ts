import { useState, useEffect, useRef } from "react";
import * as Colyseus from "colyseus.js";
import { useGameStore } from "@/store/gameStore";
import { getTestToken } from "@/utils/getToken";
import { sendSafe } from "@/utils/sendSafe";
import Cookies from "js-cookie";

const SERVER_URL = "wss://server.cryptosteron.com";
const ROOM_NAME = "clicker";
const RECONNECT_INTERVAL = 5000;
const MAX_RECONNECT_ATTEMPTS = 1000;

export const useGameClient = () => {
  const { // Хук useGameStore вызывается здесь - ПРАВИЛЬНО
    setRoom,
    setStateData,
    setIsConnected,
    setIsConnecting,
    setIsReconnecting,
    setError,
    setPlayerId,
  } = useGameStore();

  const clientRef = useRef<Colyseus.Client | null>(null);
  const reconnectAttempts = useRef(0);
  const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isConnecting = useRef(false);
  const isManualDisconnect = useRef(false);

  useEffect(() => {
    const connect = async () => {
      if (
        isConnecting.current ||
        reconnectAttempts.current >= MAX_RECONNECT_ATTEMPTS
      )
        return;
      isConnecting.current = true;
      setIsConnecting(true); // Хук вызывается здесь - ПРАВИЛЬНО

      try {
        //DEV DESKTOP
        const token = await getTestToken();
        //PROD TELEGRAM
        //const token = Cookies.get("token");
        const client = new Colyseus.Client(SERVER_URL);
        clientRef.current = client;

        const room = await client.joinOrCreate(ROOM_NAME, { token });
        reconnectAttempts.current = 0;

        room.onStateChange((state) => {
          setStateData(state as any);
        });

        room.onMessage("serverTime", (data) => {
          console.log("[serverTime]", data); // теперь регистрируем!
          setPlayerId(data?.playerId);
        });

        room.onMessage("ping", () => {
          sendSafe(room, "pong");
        });

        setRoom(room); // Хук вызывается здесь - ПРАВИЛЬНО
        setIsConnected(true); // Хук вызывается здесь - ПРАВИЛЬНО
        setError(null); // Хук вызывается здесь - ПРАВИЛЬНО

        room.onLeave(() => {
          handleDisconnection("Disconnected from room");
        });

        room.onError(() => {
          handleDisconnection("Room error");
        });
      } catch (err: any) {
        console.log("[Colyseus] Connection failed", JSON.stringify(err))
        handleDisconnection("Connection failed");
      } finally {
        isConnecting.current = false;
        setIsConnecting(false); // Хук вызывается здесь - ПРАВИЛЬНО
        setIsReconnecting(false); // Хук вызывается здесь - ПРАВИЛЬНО
      }
    };

    const handleDisconnection = (reason: string) => {
      console.warn(`[Colyseus] ${reason}`);
      setIsConnected(false); // Хук вызывается здесь - ПРАВИЛЬНО
      setError(reason); // Хук вызывается здесь - ПРАВИЛЬНО
      reconnectAttempts.current++;

      if (reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS) {
        setIsReconnecting(true); // Хук вызывается здесь - ПРАВИЛЬНО
        reconnectTimeout.current = setTimeout(() => {
          connect();
        }, RECONNECT_INTERVAL);
      } else {
        setError("Max reconnect attempts reached."); // Хук вызывается здесь - ПРАВИЛЬНО
      }
    };

    const leaveRoom = async () => {
      console.log("[Colyseus] Manual leaveRoom called");
      isManualDisconnect.current = true;
      const room = useGameStore.getState().room;
      if (room) {
        try {
          await room.leave();
          console.log("[Colyseus] Successfully left the room.");
        } catch (err) {
          console.error("[Colyseus] Error leaving room:", err);
        } finally {
          setRoom(null); // Хук вызывается здесь - ПРАВИЛЬНО
          setIsConnected(false); // Хук вызывается здесь - ПРАВИЛЬНО
        }
      }
    };

    connect(); // connect() вызывается здесь - ПРАВИЛЬНО

    return () => {
      console.log("[Colyseus] Cleaning up connection...");
      isManualDisconnect.current = true;
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      const room = useGameStore.getState().room;
      if (room) {
        room.leave();
      }
      setRoom(null); // Хук вызывается здесь - ПРАВИЛЬНО
      setIsConnected(false); // Хук вызывается здесь - ПРАВИЛЬНО
    };
  }, []);

  // Объявляем функции вне useEffect
  let connectFunc = () => {}; //  функция-заглушка
  let leaveRoomFunc = () => {}; //  функция-заглушка

  return {
    leaveRoom: leaveRoomFunc, // Возвращаем leaveRoom
    reconnect: connectFunc, // Возвращаем connect
  };
};