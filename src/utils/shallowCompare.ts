export default function shallowCompare(obj1: any, obj2: any): boolean {
   if (obj1 === obj2) {
      return true; // Ссылки на один и тот же объект
   }
   if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
      return false; // Один из аргументов не является объектом
   }

   const keys1 = Object.keys(obj1);
   const keys2 = Object.keys(obj2);

   if (keys1.length !== keys2.length) {
      return false; // Разное количество свойств
   }

   for (let key of keys1) {
      if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
         return false; // Свойства отличаются
      }
   }

   return true; // Объекты идентичны
}