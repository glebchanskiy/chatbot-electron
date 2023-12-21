import { Configuration } from "../../utils/Configuration";
const path = '/Users/glebchanskiy/workflow/chatbot/booot/src/model/impls/llm/unigram_freq.csv'
import Papa from 'papaparse';
import { LLM } from "./LLM";

function getRandomInt(max) {
 return Math.floor(Math.random() * max);
}

export class LLMImpl implements LLM {
 private config: Configuration
 private model: string

 constructor() {
  this.config = Configuration.getInstance()
  this.model = this.config.getPropertyValue('model')
 }

 public async generate(query: string): Promise<string> {
  const q = query.toLocaleLowerCase()

  if (q.includes('change') && q.includes('my') && q.includes('name') && q.includes(' to ')) {
   const prev = q.indexOf(' to ') + 4
   let next = q.indexOf(' ', prev)
   if (next === -1)
    next = q.indexOf('.', prev)
   if (next === -1)
    next = q.length

   const newName = q.slice(prev, next)
   this.config.addProperty('nickname', newName)
   return 'Now your name is `' + newName + '`'
  }
  else if (q.includes('my') && q.includes('name')) {
   const name = this.config.getPropertyValue('nickname')
   return 'Hi, your name is `' + (name.length > 1 ? name : 'anonymusss') + '`'
  } else if (q.includes('global') && q.includes('prompt')) {
   const prompt = this.config.getPropertyValue('prompt')
   return 'Your global prompt is: "' + (prompt.length > 1 ? prompt : 'undefined') + '"'
  } else {
   return this.generateAnswer()
  }
 }

 private async generateAnswer(): Promise<string> {

  const data = Papa.parse(await (await fetch(path)).text()).data

  const size = getRandomInt(20)
  let answer = ''

  for (let i = 0; i < size; i++) {
   const randomWordInex = getRandomInt(data.length - 1)
   const randomWord = data[randomWordInex][0] as string

   console.log('randomWordInex: ', randomWordInex)
   console.log('randomWord: ', randomWord)

   if (i === 0) {
    answer += `${randomWord.charAt(0).toUpperCase()}${randomWord.slice(1)}`
   } else {
    answer += ' ' + randomWord
   }

  }
  answer += '.'
  return answer
 }

}