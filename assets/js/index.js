"use strict";

class LinkedListNote {
  #next;
  #prev;
  constructor(data) {
    this.data = data;
    this.next = null; // вказівник на наступний вузол у списку
    this.prev = null; // вказівник на попередній вузол у списку
  }

  get next() {
    return this.#next;
  }

  get prev() {
    return this.#prev;
  }

  set next(node) {
    if (node === null || LinkedListNote.isLinkedListNode(node)) {
      this.#next = node;
      return;
    }

    throw new TypeError("Invalid node value");
  }

  set prev(node) {
    if (node === null || LinkedListNote.isLinkedListNode(node)) {
      this.#prev = node;
      return;
    }

    throw new TypeError("Invalid node value");
  }

  static isLinkedListNode(value) {
    return value instanceof LinkedListNote;
  }
}

class DoubleLinkedList {
  #head;
  #tail;
  constructor() {
    this.head = null; // перший вузол у списку
    this.tail = null; // останній вузол у списку
    this.length = 0; // довжина списку
  }

  get head() {
    return this.#head;
  }

  get tail() {
    return this.#tail;
  }

  set head(node) {
    if (node === null || LinkedListNote.isLinkedListNode(node)) {
      this.#head = node;
      return;
    }

    throw new TypeError("Invalid node value");
  }

  set tail(node) {
    if (node === null || LinkedListNote.isLinkedListNode(node)) {
      this.#tail = node;
      return;
    }

    throw new TypeError("Invalid node value");
  }

  // вставка значення у кінець списку
  push(data) {
    /* 
      1. Створити новий вузол списку
      2. вставити вузол у список
        2.1 якщо список пустий, то зробити вузол і головою і хвостом списку
        2.2 якщо список не пустий, то 
          2.2.1 новий вузол має вказувати на попередній хвіст
          2.2.2 попередній хвіст має вказувати на новий вузол як на наступний вузол
          2.2.3 маємо змінити хвіст на новий елемент
        3. збільшити довжину списку
        4. повернути довжину списка
    */

    // 1. Створити новий вузло списку
    const newNode = new LinkedListNote(data);

    // 2.1 якщо список пустий, то зробити вузол і головою і хвостом списку
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // 2.2.1 новий вузол має вказувати на попередній хвіст
      newNode.prev = this.tail;
      // 2.2.2 попередній хвіст має вказувати на новий вузол як на наступний вузол
      this.tail.next = newNode;
      // 2.2.3 маємо змінити хвіст на новий елемент
      this.tail = newNode;
    }

    this.length++;

    return this.length;
  }

  // видалення останнього вузла зі списку
  pop() {
    /* 
      1. якщо список пустий, то нічого не робимо взагалі
      2. якщо список не пустий:
        2.1 зберігаємо останній вузол в окрему змінну
        2.2 змінюємо хвіст на передостанній елемент
        2.3 перевіряємо чи існує передостанній елемент (чи довжина дорівнює 1)
          2.3.1 якщо не існує head і tail встановлюємо в null
          2.3.2 якщо існує, передостанньому елементу змінюємо next на null
            (опціонально витираємо останьому елементу prev)
        3. зменшьшити довжину
        4. повертаємо вузол який видалили
    */

    // 1. якщо список пустий, то нічого не робимо взагалі
    if (this.length === 0) {
      return undefined;
    }

    // 2.1 зберігаємо останній вузол в окрему змінну
    const deletedNode = this.tail;
    // 2.2 змінюємо хвіст на передостанній елемент
    this.tail = deletedNode.prev;
    if (this.length === 1) {
      //2.3.1 якщо не існує head і tail встановлюємо в null
      this.head = null;
      this.tail = null;
    } else {
      //2.3.2 якщо існує, передостанньому елементу змінюємо next на null
      deletedNode.prev.next = null;
      //(опціонально витираємо останьому елементу prev)
      deletedNode.prev = null;
    }

    // 3. зменшьшити довжину
    this.length--;
    // 4. повертаємо вузол який видалили
    return deletedNode;
  }

  // вставка значення у початку списку
  unshift(data) {
    // 1. Створити новий вузол у списку
    const newNode = new LinkedListNote(data);
    
    // 2.1 якщо список був пустий, то встановити значення head і tail на той вузол який ми створили
    if(!this.length) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // 2.2 якщо список не пустий то взяти вузол head і задати йому значення prev на новий вузол
      this.head.prev = newNode;
      // 2.3 вже нашому новому вузлу задати значення next на наший старий вузол head
      newNode.next = this.head;
      // 2.4 віддати значення head нашому новому вузлу
      this.head = newNode;
    }
    // 3. Збільшити довжину списка
    this.length++;
    // 4. повернути довжину списка
    return this.length;
  }

  // видалення першого вузла зі списку
  shift() {
    // 1. Якщо список пустий, то повертаємо undefined
    if(!this.length) {
      return undefined;
    }

    // 2.1 Зберігаємо наш вузол в окрему змінну
    const deletedNode = this.head;
    // 2.2 Перевіряємо чи існує наступний вузол (довжина не дорівнює 1) 
    if(this.length === 1) {
      // 2.2.1 Якщо довжина дорівнює 1, то встановити head та tail в null
      this.head = null;
      this.tail = null;
    } else {
      // 2.2.2 Якщо довжина більше ніж 1, то віддати наш head наступному вузлу 
      this.head = deletedNode.next;
      // 2.2.3 Видалити в наступного вузла значення prev
      deletedNode.next.prev = null;
    }

    this.length--;

    return this.length;
  }

  // пошук вузла у списку
  find(data) {
    // СПОСІБ ЧЕРЕЗ РЕКУРСІЮ -----------------
    // // 1. перевіряємо чи пустий наш список
    // if(!this.length) {
    //   return undefined;
    // }
    
    // function recursionSearch(node) {
    //   // 2.1 якщо жодного вузла не знайдено, то вертаємо null
    //   if(!node) {
    //     return null;
    //   }
    //   // 2.2 Наш базовий випадок рекурсії, коли ми знайшли потрібний вузел
    //   if(node.data === data) {
    //     return node;
    //   }

    //   return recursionSearch(node.next);
    // }
    
    
    // // 2.3 Вертаємо результат виконання нашої рекурсивної функції
    // return recursionSearch(this.head)
    
    // СПОСІБ ЧЕРЕЗ ЦИКЛ -----------------
    // 1. перевіряємо чи пустий наш список
    if(!this.length) {
      return undefined;
    }

    // 2. Зберігаємо в змінну наш початок списка
    let currentNode = this.head;

    // 3. Поки у нас є вузли, перебираємо кожен вузол
    while(currentNode) {
      if(currentNode.data === data) {
        // 3.1 Якщо це той вузол, який потрібен і данні вірні, то вертаємо його
        return currentNode;
      }
      // 3.2 При кожному крокові переписуєм наш вузол на наступний (next)
      currentNode = currentNode.next;
    }

    // 4. якщо нічого не знайдено, то вертаємо null
    return null;
  }
}

const list1 = new DoubleLinkedList();

list1.push("first");
list1.push("second");
list1.push("third");

list1.unshift('unshift');

console.log(list1);
