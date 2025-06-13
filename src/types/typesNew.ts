import { Emitter } from 'mitt';
import { Room } from 'colyseus.js';

// Доступные языки
type Language = 'en' | 'ru';

// Состояние комнаты
type RoomState = {
    // Язык
    lang: Language
    // ID кто пригласил
    inviteId: number,
    /* Тапы */
    // Основной баланс
    balance: number,
    // Баланс реальных денег, для выигрышей в лотереях
    // Автоматически обновляется при подключении к комнате или раз в минуту когда игрок онлайн
    balanceCash: number,
    // Текущий уровень мультитапа
    multiTapLevel: number,
    // Начальная стоимость улучшения мультитапа
    multiTapCost: number,
    /* Пинг */
    // Состояние соединения от 0 до 100 в процентах
    connectionQuality: number,
    // Задержка соединения
    latency: number,
    /* Для уровня */
    // Текущий уровень игрока
    level: number,
    // Всего накликано за всё время
    totalClicks: number,
    // Кликов до следующего уровня
    nextLevelClicks: number,
    // Максимум кликов в предыдущем уровне
    previousLevelClicks: number,
    // Название текущего уровня
    levelName: string,
    // Сколько начисляем за 1 клик
    clickValue: number,
    // Нужно натапать до следующего уровня
    clicksRemainingForNextLevel: number,
    /* Энергия */
    // Уровень улучшения максимальной емкости энергии
    energyMaxLevel: number,
    // Начальная стоимость улучшения емкости
    energyUpgradeCost: number,
    // Максимальный лимит энергии
    energyMax: number,
    // Доступно энергии
    energy: number,
    // Сколько раз можно восстановить энергию
    energyRestoreRemaining: number,
    // Время до следующего восстановления (UNIX timestamp)
    nextEnergyRestoreTime: number,
    /* Турбо буста */
    // Количество оставшихся активаций турбо буста за день
    turboBoostsRemaining: number,
    // Время, когда можно активировать следующий турбо буст (UNIX timestamp)
    nextTurboBoostTime: number,
    // Статус активированного турбо буста
    turboBoostStatus: boolean,
    /* Награда с карточек */
    // Временная прибыль для оффлайн-периода
    temporaryProfit: number,
    // Текущая прибыль в час
    profitPerHour: number,
    /* Ежедневные награды */
    // Стрик пользователя (количество дней подряд)
    currentStreak: number,
    // Последняя дата получения награды
    lastRewardDate: number | null,
    // Массив наград
    availableRewards: Reward[],
    // Массив карточек
    userCards: Card[]
};

// Типизация меню с карточками
type CardMenu = {
    // ID категории
    id: string | number,
    // Название категории в меню
    name: string
};

// Типизация уровня игры
type TapLevel = {
    // Уровень
    level: number,
    // Начало уровня
    min: number,
    // Лимит уровня
    max: number,
    // Название
    name: string,
    // Кол-во тапов которое требуется
    tap: number
};

// Награда за достижение определённого уровня приглашённым другом
type FriendLevelReward = {
    // Уникальный идентификатор награды
    id: number,
    // Тип награды — всегда 'level' (за уровень)
    type: 'level',
    // Уровень, за который выдана награда (например, 5, 10 и т.д.)
    level: number,
    // Сумма награды
    reward: number,
    // Признак, была ли награда уже получена (true — получена, false — нет)
    finished: boolean
};

// Награда за регистрацию приглашённого друга
type FriendRegistrationReward = {
    // Уникальный идентификатор награды (id строки в clicker_friends)
    id: number,
    // Тип награды — всегда 'registration' (за регистрацию)
    type: 'registration',
    // Сумма награды
    reward: number,
    // Признак, была ли награда уже получена (true — получена, false — нет)
    finished: boolean
};

// Приглашённый друг с наградами и состоянием
type InvitedFriend = {
    // Уникальный идентификатор приглашения (id в clicker_friends)
    id: number,
    // Идентификатор приглашённого пользователя (join_id)
    joinId: number,
    // Имя приглашённого пользователя
    name: string,
    // Текущий уровень приглашённого пользователя
    level: number,
    // Есть ли хотя бы одна незабранная награда у этого друга
    hasUnclaimed: boolean,
    // Массив активных незабранных наград (обычно максимум одна или пустой)
    // Бекенд награды выдает по очереди от регистрации и далее по увеличению уровня (от мин до макс)
    rewards: (FriendRegistrationReward | FriendLevelReward)[]
};

// Типизация задания
type Task = {
    // ID задания
    id: number,
    // уникальный ключ задания
    task: string,
    // URL канала, если это задание с подпиской
    url: string | null,
    // Сумма награды
    reward: number,
    // Задание завершено или нет
    finished: boolean,
    // Если завершено, то время его завершения
    completedAt: number | null,
    // Статус задания
    // - claim статус нужен если задание было добавлено другим скриптом/сервисом в базу
    // - В этом случае добавляем задание, без finished по дефолту
    status: string // active | claim | completed
};

// Типизация пользователя в рейтинге
type PlayerRating = {
    // Имя пользователя
    username: string,
    // Текуший баланс
    balance: number,
    // Общее кол-во кликов
    total: number
};

// Ежедневные награды
type Reward = {
    // День награды
    day: number,
    // Сколько начисляется
    reward: number,
    // Получена ли награда
    isCollected: boolean,
    // Доступна ли награда
    isAvailable: boolean
};

// Типизация карточек
type Card = {
    // ID карточки
    id: number,
    // Название карточки
    name: string,
    // Текущий уровень карточки
    level: number,
    // Цена карточки
    price: number,
    // Прибыль в час
    profit: number,
    // Цена карточки за следующий уровень
    nextPrice: number,
    // Прибыль в час на следующий уровень
    nextProfit: number,
    // ID зависимой карточки
    dependencyCardId: number | null,
    // Требуемый уровень игрока для разблокировки покупки
    requiredLevel: number | null,
    // Требуемый уровень зависимой карточки для разблокировки
    dependencyCardLevel: number | null,
    // Разблокирована ли карточка
    unlocked: boolean,
    // Статус карточки, влияет на начисление прибыли
    status: number,
    // Тип карточки, для фильтрации и отображения в меню, по типу
    cardType: number,
    // Максимально доступный уровень карточки
    maxCardLevel: number
};

// Базовые данные розыгрыша
type LotteryItem = {
    // ID розыгрыша
    id: number,
    // Тип билета
    // 1 -> EASY
    // 2 -> OPTIMAL
    // 3 -> ELITE
    ticketType: number,
    // Текущий день лотереи
    dayStreak: number,
    // Дата запуска лотереи
    createdAt: number,
    // Продажа билетов разрешена до этой даты
    sellingUntil: number,
    // Когда будет розыгрыш
    drawingAt: number,
    // Статус лотереи
    status: number,
    // Всего билетов куплено
    totalTickets: number,
    // ID билета который выиграл
    winnerTicketId: number | null,
    // ID пользователя который победил
    winnerUserId: number | null,
    // Сумма приза
    prize: number,
    // Время когда розыгрыш был завершен
    closedAt: number | null,
    // Информация для проверки честности
    provablyFair: {
        // Формула для расчета
        formula: string,
        // Хеш серверного сида
        serverSeedHash: string | null,
        // Сид сервера
        serverSeed: string | null,
        // Сид клиента
        clientSeed: string | null,
        // Время когда был сформирован Provably Fair для розыгрыша
        proofGeneratedAt: number | null
    }
};

// Данные розыгрыша с шансом, кол-вом купленных билетов и текущей ценой
type LotteryStatus = LotteryItem & {
    // Цена билета для текущего розыгрыша
    price: number
    // Кол-во билетов
    myTickets: number,
    // Шанс на выигрыш
    myChance: number
};

// Результат проверки честности розыгрыша в лотерее
type ProvablyFairLottery = {
    // ID игры
    game: 'lottery',
    // ID розыгрыша
    drawId: number,
    // Хеш серверного сида
    serverSeedHash: string,
    // Серверный сид
    serverSeed: string,
    // Сид клиент
    clientSeed: string,
    // Время формирования Provably Fair
    proofGeneratedAt: number,
    // Идентификаторы билетов
    ticketIds: number[],
    // Формула для расчета победителя
    formula: string,
    // Индекс победителя расчитанный по формуле
    expectedWinnerIndex: number,
    // ID выигрышного билета
    winnerTicketId: number,
    // ID игрока который победил
    winnerUserId: number
};

// Результат проверки честности игры Runner
type ProvablyFairRunner = {
    // ID игры
    game: 'runner',
};

// События для Emitter
type Events = {
    /* send события которые отправляем на сервер */

    // Pong событие для расчета задержки подключения
    pong: void;
    // Отображение списка заданий
    getTasks: void;
    // Событие для покупки мультитап уровня
    buyMultiTap: void;
    // Запрашиваем информацию о карточках
    getCardsInfo: void;
    // Событие на активацию турбо режима
    activateTurbo: void;
    // Событие на восстановление энергии
    restoreEnergy: void;
    // Запрос на получение ежедневной нарады
    claimDailyReward: void;
    // Событие на покупку увеличения емкости энергии
    buyEnergyUpgrade: void;
    // Запрос информации о состоянии ежедневных наград
    getDailyRewardInfo: void;
    // Запрос на сбор прибыли которая накапала с карточек
    collectCardsProfit: void;
    // Событие на покупку карточки по её ID
    buyCard: { cardId: number };
    // События для обновления языка в базе данных и состоянии комнаты
    language: { lang: string };
    // Запрос на проверку и начисление награды за выполененное задание
    getTaskReward: { taskId: number };
    // Событие нажатий с координатами где кликнули
    click: { left: number, top: number };
    // Получаем награду за приглашенного друга или увеличение его уровня
    getFriendReward: { rewardId: number, type: 'registration' | 'level' };
    // Отображение уровней профиля,
    // level не обязательные данные, будет отображать Топ рейтинг игроков
    // если level не указывать, то будет выборка по игрокам текущего уровня игрока
    helpLevels: { level: number };
    // Получаем список друзей с пагинацией
    getFriendsList: { page: number, pageSize: number };
    // Запрос на получение статуса всех активных розыгрышей (easy, optimal, elite)
    getLotteryStatus: void;
    // Запрос на получение статуса розыгрыша вкл\выкл
    getLotteryGlobalStatus: void;
    // Обработчик на получение истории транзакций по cash балансу с пагинацией
    getTransactionHistory: { page: number, pageSize: number, filter: 'in' | 'out' | null };
    // Событие для отображения глобальной истории лотерей по типу билетов с пагинацией
    getLotteryHistory: { ticketType: 'easy' | 'optimal' | 'elite', page: number, pageSize: number };
    // Запрос на получение истории билетов пользователя по ID розыгрыша с пагинацией
    getLotteryTickets: { lotteryId: number, page: number, pageSize: number };
    // Событие для отображения истории всех покупок билетов пользователя
    getLotteryPurchaseHistory: { page: number, pageSize: number };
    // Обработчик покупки лотерейных билетов по ID розыгрыша и кол-ву билетов
    buyTickets: { lotteryId: number, count: number };
    // Запрос на получение данные для проверки честности
    getProvablyFair: { game: 'runner' | 'lottery', hash: string };

    /* onMessage события которые получаем на клиенте от сервера */

    // Событие, при котором нужно отправить обратно Pong
    ping: void;
    // Событие тапов с значением и координатами где был клик (top: координаты Y, left: координаты X)
    clickValue: { value: number, left: number, top: number };
    // Событие при получении серверного времени
    serverTime: { playerId: string, server: { date: string }; };
    // Событие для отображения карточек
    cardsInfo: { menu: CardMenu[], cards: Card[] };
    // Событие отображения списка друзей
    friendsList: {
        // Результат
        status: boolean,
        // Сообщение с ошибкой, если она есть
        message?: string,
        // Список друзей, (присутствует если статус true)
        list?: {
            // Массив с друзьями
            friends: InvitedFriend[],
            // Общее кол-во друзей
            total: number,
            // Текущая страница
            page: number,
            // Кол-во друзей на странице
            pageSize: number,
            // Следующая страница, если есть
            nextPage: number | null,
            // Предыдущая страница, если есть
            prevPage: number | null
        };
    };
    // Обработчик турбо буста
    turboBoost: {
        // Результат
        success: boolean,
        // Статус код
        code: 'Enable' | 'Disable' | 'BoostAlreadyActivated' | 'NoBoostRemaining' | 'BoostCoolDown',
        // Сообщение с текстом
        message: string,
        // Время до следующего восстановления Турбо буста в UNIX timestamp, (присутствует если код Enable)
        turboBoostsRemaining?: number
    };
    // Событие для отображения списка заданий
    taskList: {
        // Результат
        status: boolean,
        // Массив заданий
        tasks: Task[]
    };
    // Событие приходит в ответ на запрос о проверке задания (выполнено или нет)
    taskStatus: {
        // Результат
        status: boolean,
        // Сообщение с ошибкой, если она есть
        message?: string,
        // Награда (присутствует в обьекте если статус true)
        reward?: {
            // ID задания
            taskId: number,
            // Сколько получили
            claim: number,
            // Баланс после выполненного задания
            balance: number
        };
    };
    // Событие для отображения уровней игры
    levelsData: {
        // Текущий уровень игрока
        currentLevel: number,
        // Данные по запрошенному уровню, если его не указывать, то считаем что запросили для текущего уровня игрока
        requestedLevel: {
            // Уровень который мы запросили
            level: number,
            // Массив с игроками в запрошенном уровне
            rating: PlayerRating[]
        };
        // Массив всех уровней
        levels: TapLevel[]
    };
    // Событие для получения данных о мгновенной энергии
    restoreInstantEnergy: {
        // Результат
        success: boolean,
        // Код статуса
        code: 'OK' | 'EnergyIsFull' | 'EnergyCoolDown' | 'EnergyLimit',
        // Сообщение с ошибкой, если она есть
        message?: string,
        // Текущая энергия, (присутствует если код OK)
        energy?: number,
        // Сколько раз можно восстановить энергию, (присутствует если код OK)
        energyRestoreRemaining?: number,
        // Время до следущего восстановления энергии в UNIX timestamp, (присутствует если код OK)
        nextEnergyRestoreTime?: number
    };
    // Событие для получения данных о результате апгрейда энергии
    buyEnergyResult: {
        // Результат
        success: boolean,
        // Сообщение с ошибкой, если она есть
        message?: string,
        // Максимальный лимит энергии, (присутствует если результат true)
        newEnergyMax?: number,
        // Стоимость улучшения емкости энергии, (присутствует если результат true)
        nextUpgradeCost?: number
    };
    // Событие с суммой сколько можно забрать прибыли с карточек
    /* Если > 0 то мы должны забрать прибыль событием collectCardsProfit,
       иначе сервер не будет начислять новую прибыль */
    offlineCardProfit: { profit: number };
    // Событие c информацией после того как забрали прибыль с карточек через collectCardsProfit
    profitCardsCollectStatus: {
        // Результат
        success: boolean,
        // Сообщение с ошибкой, если она есть
        message?: string,
        // Баланс (присутствует если результат true)
        balance?: number
    };
    // Событие для отображения информации о покупке карты
    profitCardsBuyStatus: {
        // Результат
        status: boolean,
        // Сообщение с тексом
        message: string,
        // ID карточки (присутствует если status: true)
        cardId?: number,
        // Уровень карточки (присутствует если status: true)
        level?: number,
        // Цена карточки (присутствует если status: true)
        price?: number,
        // Прибыль карточки (присутствует если status: true)
        profit?: number
    };
    // Событие с данными об статусе ежедневных наградах
    dailyRewardInfo: {
        // Время последнего получения награды в UNIX
        lastRewardDate: number | null,
        // Текущий стрик (на каком из дней находимся)
        currentStreak: number,
        // Информация по каждому дню
        availableRewards: Reward[],
    };
    // Событие на запрос о получении ежедневной награды
    rewardClaim: {
        // Результат
        success: boolean,
        // Сообщение с тексом
        message: string,
        // Массив с наградами за каждый день, (присутствует если результат true)
        availableRewards?: Reward[],
    };
    // Событие для получения данных о результате апгрейда мультитапа
    buyMultiTapResult: {
        // Результат
        success: boolean,
        // Сообщение с ошибкой, если она есть
        message?: string,
        // Текущий уровень мультитапа (присутствует если success: true)
        multiTapLevel?: number,
        // Сколько начисляем за 1 клик (присутствует если success: true)
        clickValue?: number,
        // Стоимость улучшения мультитапа (присутствует если success: true)
        nextUpgradeCost?: number
    };
    // Событие для отображения истории всех покупок билетов пользователя
    LotteryPurchaseHistory: {
        // Результат
        status: boolean,
        // Сообщение с тексом
        message: string,
        // Данные, если нет ошибок
        data?: {
            // Общее кол-во покупок
            total: number,
            // Текущая страница
            page: number,
            // Кол-во заказов на странице
            pageSize: number,
            // Следующая страница, если есть
            nextPage: number | null,
            // Предыдущая страница, если есть
            prevPage: number | null
            // Массив заказов
            items: {
                // ID заказа
                id: number,
                // ID розыгрыша
                lotteryId: number,
                // Кол-во билетов в заказе
                qty: number,
                // Цена за билет
                pricePerTicket: number,
                // Дата покупки
                createdAt: number
            }[]
        }
    };
    // Событие для отображения глобальной истории лотерей
    LotteryHistory: {
        // Результат
        status: boolean,
        // Сообщение с тексом
        message: string,
        // Данные
        data?: {
            // Общее кол-во розыгрышей
            total: number,
            // Текущая страница
            page: number,
            // Кол-во розыгрышей на странице
            pageSize: number,
            // Следующая страница, если есть
            nextPage: number | null,
            // Предыдущая страница, если есть
            prevPage: number | null
            // Массив с списком розыгрышей
            items: LotteryItem[]
        }
    };
    // История билетов пользователя по розыгрышу с пагинацией
    LotteryTickets: {
        // Результат
        status: boolean,
        // Сообщение с тексом
        message: string,
        // Данные, если нет ошибок
        data?: {
            // Общее кол-во билетов
            total: number,
            // Текущая страница
            page: number,
            // Кол-во розыгрышей на странице
            pageSize: number,
            // Следующая страница, если есть
            nextPage: number | null,
            // Предыдущая страница, если есть
            prevPage: number | null
            // Массив билетов
            items: {
                // ID билета
                ticketId: number,
                // ID покупки
                purchaseId: number,
                // ID розыгрыша
                lotteryId: number,
                // Дата создания
                createdAt: number
            }[]
        }
    }
    // Общий статус всех активных розыгрышей, по типам (easy, optimal, elite)
    LotteryStatus: {
        // Результат
        status: boolean,
        // Сообщение с тексом
        message: string,
        // Данные с списком текущих розыгрышей, если нет ошибок
        data?: LotteryStatus[]
    };
    // Глобальный статус — лотерея включена/выключена
    LotteryGlobalStatus: {
        // Результат
        status: boolean,
        // Сообщение с тексом
        message: string,
        // Данные, если нет ошибок
        data?: {
            // Включено или выключено
            enabled: boolean
        }
    };
    // Событие с результатом о покупке билетов
    buyTicketsResult: {
        // Результат
        status: boolean,
        // Сообщение с тексом
        message: string,
        // Данные, если нет ошибок
        tickets?: {
            // ID розыгрыша
            lotteryId: number,
            // Кол-во купленных билетов
            count: number
        }
    };
    // История транзакций входящие/исходящие платежи для cash баланса
    TransactionHistory: {
        // Результат
        status: boolean,
        // Сообщение с тексом
        message: string,
        // Данные, если нет ошибок
        data?: {
            // Общее кол-во транзакций
            total: number,
            // Текущая страница
            page: number,
            // Кол-во транзакций на странице
            pageSize: number,
            // Следующая страница, если есть
            nextPage: number | null,
            // Предыдущая страница, если есть
            prevPage: number | null
            // Массив транзакций
            transactions: {
                // ID транзакции
                id: number,
                // Тип транзакции
                type: 'in' | 'out',
                // Статус транзакции
                status: 'processing' | 'completed' | 'canceled',
                // Дата создания транзакции
                createdAt: number,
                // Дата когда транзакция завершена
                completedAt: number | null,
                // ID розыгрыша (если платеж вязан с лотереей)
                lotteryId: number | null,
                // Мемо текст
                info: string | null
            }[]
        }
    };
    // Результат проверки SHA-256 в зависимости от игры
    ProvablyFair: {
        // Результат
        status: boolean,
        // Сообщение с тексом
        message: string,
        // Данные, если нет ошибок
        data?: ProvablyFairLottery | ProvablyFairRunner
    };
};

// Типизация Store для стейт менеджера Zustand
type GameStore = {
    // Игровая комната
    room: Room | null,
    // Состояние комнаты
    stateData: RoomState | null,
    // Подключен ли к комнате
    connected: boolean,
    // Текстовый статус подключения к сокету
    status: string,
    // Emitter c событиями
    emitter: Emitter<Events>,
    // Загрузка в первый раз
    initialStateLoaded: boolean,
    /* экшены */
    // Подключение
    connect: () => void,
    // Отправка события в комнату
    send: (type: keyof Events, payload?: any) => void
};

export {
    type GameStore,
    type RoomState,
    type Language,
    type CardMenu,
    type Events,
    type Card
}