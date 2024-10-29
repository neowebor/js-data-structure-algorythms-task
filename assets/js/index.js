'use strict';

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
      1. Створити новий вузло списку
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
}

const list1 = new DoubleLinkedList();

list1.push("first");
list1.push("second");
list1.push("third");

console.log(list1);
