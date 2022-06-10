import { SnippetConfig } from "../../lib/blog/blogData";

const example: SnippetConfig = {
  name: "Example",
  language: "ts",
  snippet: `interface StringList {
    /**
     * @param elem The element to add
     * @param idx 0-indexed, the index of the new element
     */
    add(elem: string, idx: number);
 
    /**
     * @param idx 0-indexed, the index of the element to remove
     */
    remove(idx: number): boolean;
 
    /**
     * Returns the index of an element, or <code>null</code> if it is not in the list
     */
    indexOf(elem: string): number | null;
}

function contains(list: StringList, elem: string): boolean {
    return list.indexOf(elem) !== null;
}

function setElement(list: StringList, idx: number, newElem: string): boolean {
    const removed = list.remove(idx);
    if (!removed) return false;
    list.add(newElem, idx);
}

function replaceElement(
    list: StringList,
    oldElem: string,
    newElem: string
): boolean {
    const idx = list.indexOf(oldElem);
    if (idx === null) return false;
    return setElement(list, idx, newElem);
}`
}

const list: SnippetConfig = {
  name: "List",
  language: "ts",
  snippet: `const listValues = ["hi", "there", "friend"];
  const list = {
      indexOf(elem: string): number | null {
          const idx = listValues.indexOf(elem)
          if(idx === -1) return null;
          return idx;
      }
  };`
}

const stubs: SnippetConfig = {
  name: "Stubs",
  language: "ts",
  snippet: `const listValues = ["hi", "there", "friend"];
  const list = {
      add(elem: string, idx: number){
        throw new Error("not implemented");
      },
      remove(idx: number){
        throw new Error("not implemented");
      },
      indexOf(elem: string): number | null {
        const idx = listValues.indexOf(elem);
        if (idx === -1) return null;
        return idx;
      }
  };`
}

const functional: SnippetConfig = {
  name: "Functional",
  language: "ts",
  snippet: `const listValues = ["hi", "there", "friend"];
  const list = {
      add(elem: string, idx: number){
        listValues.splice(idx, 1, elem)
      },
      remove(idx: number){
        const deleted = listValues.splice(idx, 1);
        return deleted.length > 0;
      },
      indexOf(elem: string): number | null {
        const idx = listValues.indexOf(elem);
        if (idx === -1) return null;
        return idx;
      }
  };`
}

const interfaces: SnippetConfig = {
  name: "Interfaces",
  language: "ts",
  snippet: `interface Searchable {
    indexOf(elem: string): number | null;
}

interface Mutable {
    add(elem: string, idx: number);
    remove(idx: number): boolean;
}

interface StringList {
    add(elem: string, idx: number);
    remove(idx: number): boolean;
    indexOf(elem: string): number | null;
}`
}

const methods: SnippetConfig = {
  name: "Method Signatures",
  language: "ts",
  snippet: `function contains(
    list: Searchable,
    elem: string
): boolean

function setElement(
    list: Mutable,
    idx: number,
    newElem: string
): boolean

function replaceElement(
    list: StringList,
    oldElem: string,
    newElem: string
): boolean`
}

const smi: SnippetConfig = { 
  name: "Single-method Interfaces",
  language: "ts",
  snippet: `interface I_add {
    add(elem: string, idx: number);
}
interface I_remove {
    remove(idx: number): boolean;
}
interface I_indexOf {
    indexOf(elem: string): number | null;
}`
}

const smiSignatures: SnippetConfig = {
  name: "SMI Signuatures",
  language: "ts",
  snippet: `function contains(
    list: I_indexOf,
    elem: string
): boolean

function setElement(
    list: I_add & I_remove,
    idx: number,
    newElem: string
): boolean

function replaceElement(
    list: I_indexOf & I_add & I_remove,
    oldElem: string,
    newElem: string
): boolean`
}

const pickExample: SnippetConfig = {
  name: "Pick Example",
  language: "ts",
  snippet: `type Person = {
    name: string,
    age: number,
    incrementAge: () => void
}

type ThingWithAge = Pick<Person, "age" | "incrementAge">;`
}

const pickResult: SnippetConfig = {
  name: "Equivalent to Pick",
  language: "ts",
  snippet: `type ThingWithAge = {
    age: number,
    incrementAge: () => void
}`
}

const firstInterface: SnippetConfig = {
  name: "Interface",
  language: "ts",
  snippet: `  interface StringList {
    add(elem: string, idx: number);
    remove(idx: number): boolean;
    indexOf(elem: string): number | null;
}`
}

const utility: SnippetConfig = {
  name: "Utility Methods",
  language: "ts",
  snippet: `function contains(
    list: Pick<StringList, "indexOf">,
  elem: string
): boolean {
    return list.indexOf(elem) !== null;
}

function setElement(
    list: Pick<StringList, "add" | "remove">,
    idx: number,
    newElem: string
): boolean {
    const removed = list.remove(idx);
    if (!removed) return false;
    list.add(newElem, idx);
}

function replaceElement(
    list: Pick<StringList, "indexOf" | "add" | "remove">,
    oldElem: string,
    newElem: string
): boolean {
    const idx = list.indexOf(oldElem);
    if (idx === null) return false;
    return setElement(list, idx, newElem);
}`
}

const parameters: SnippetConfig = {
  name: "A Solution",
  language: "ts",
  snippet: ` type Parameter<
  T extends (...args: any) => any,
  idx extends number
> = Parameters<T>[idx]`
}

const usingUtility: SnippetConfig = {
  name: "Using Utility",
  language: "ts",
  snippet: `function replaceElement(
    list: Pick<StringList, "indexOf"> & Parameter<typeof setElement, 0>,
    oldElem: string,
    newElem: string
): boolean`
}

const chaining: SnippetConfig = {
  name: "Chaining",
  language: "ts",
  snippet: `function chaining(list: StringList): StringList {
    setElement(list, 0, "example");
    return list;
}`
}

const genericChaining: SnippetConfig = {
  name: "Chaining with Generics",
  language: "ts",
  snippet: `
  // Role Interfaces
  function chaining<T extends Mutable>(list: T): T
  
  // Single Method Interfaces
  function chaining<T extends I_add & I_remove>(list: T): T
  
  // Pick
  function chaining<T extends Pick<StringList, "add" | "remove">>(list: T): T` 
}

export default {
  example, list, stubs, functional, interfaces, methods, smi, smiSignatures, pickExample, pickResult, firstInterface, utility, parameters, usingUtility, chaining, genericChaining
}
