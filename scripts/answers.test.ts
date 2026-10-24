// Tests de la comparaison des réponses et du dictionnaire : `npm test`.
// L'accès (anglais / néerlandais) se choisit avec la variable EDITION, comme pour check-data.
import test from 'node:test'
import assert from 'node:assert/strict'
import { EDITION } from '../src/edition.ts'
import { checkAnswer, checkGap, checkVocab, contractionKey, normalizeForComparison, sameAnswer } from '../src/lib/text.ts'
import { baseForms, lookup, expressionAround, helpWords, isProperName } from '../src/lib/lexicon.ts'
import { findInSentence, wordCores } from '../src/lib/path.ts'

const ok = (input: string, expected: string[], wrong?: string) => assert.equal(checkAnswer(input, expected, wrong).verdict, 'correct', `« ${input} » devrait être accepté pour ${JSON.stringify(expected)}`)
const ko = (input: string, expected: string[], wrong?: string) => assert.notEqual(checkAnswer(input, expected, wrong).verdict, 'correct', `« ${input} » ne devrait PAS être accepté pour ${JSON.stringify(expected)}`)

if (EDITION.lang === 'en') {
  test('contractions : dans les deux sens, pour tous les pronoms', () => {
    const pairs: [string, string][] = [
      ["I'm happy", 'I am happy'], ['You’re late', 'You are late'], ['He’s a doctor', 'He is a doctor'], ['She’s tired', 'She is tired'],
      ['It’s cold', 'It is cold'], ['We’re here', 'We are here'], ['They’re friends', 'They are friends'], ['There’s a cat', 'There is a cat'],
      ['That’s my bag', 'That is my bag'], ['What’s your name?', 'What is your name?'], ['I’ve finished', 'I have finished'], ['We’ll help', 'We will help'],
      ['I’d like a coffee', 'I would like a coffee'], ['I don’t know', 'I do not know'], ['She isn’t here', 'She is not here'], ['I can’t swim', 'I cannot swim'],
      ['He won’t come', 'He will not come'], ['Let’s go', 'Let us go'],
    ]
    for (const [a, b] of pairs) {
      ok(a, [b])
      ok(b, [a])
    }
  })

  test('« ’s » : is, has, mais aussi la forme telle quelle (possessif)', () => {
    ok('He has got a bike', ['He’s got a bike'])
    ok('It is been raining', ['It’s been raining'].map((x) => x.replace('been', 'been')))
    ok('She has been here', ['She’s been here'])
    ok('Peter’s car is red', ['Peter’s car is red'])
    ko('They are late', ['He’s late'])
  })

  test('une vraie erreur reste une erreur', () => {
    ko('I am agree', ['I agree'])
    ko('He go to school', ['He goes to school'])
    ko('I have 30 years', ['I am 30'])
    ko('She are late', ['She is late'])
  })

  test('casse, ponctuation et orthographe britannique / américaine', () => {
    ok('i AM happy!', ['I am happy.'])
    ok('Organise the colour', ['Organize the color'])
    ok('Organize the color', ['Organise the colour'])
    ok('  Hello,   world ', ['hello world'])
  })

  test('faute de frappe : tolérée seulement sur un mot long, jamais sur un petit mot grammatical', () => {
    assert.equal(checkAnswer('importent', ['important']).verdict, 'typo')
    assert.equal(checkAnswer('an apple', ['a apple']).verdict, 'wrong')
    assert.equal(checkAnswer('in Monday', ['on Monday']).verdict, 'wrong')
  })

  test('phrase à corriger : la phrase fautive recopiée n’est jamais acceptée', () => {
    assert.notEqual(checkAnswer('He go to school', ['He goes to school'], 'He go to school').verdict, 'correct')
    assert.equal(checkAnswer('prize', ['price'], 'prize').verdict, 'wrong')
  })

  test('phrase à trou : on peut taper le mot avec son voisin (I’m pour « I ___ happy »)', () => {
    assert.equal(checkGap('am', ['am'], 'I ___ happy').verdict, 'correct')
    assert.equal(checkGap('I’m', ['am'], 'I ___ happy').verdict, 'correct')
    assert.equal(checkGap('She’s', ['is'], 'She ___ a doctor').verdict, 'correct')
    assert.equal(checkGap('They’re', ['are'], 'They ___ here').verdict, 'correct')
    assert.equal(checkGap('was', ['is'], 'She ___ a doctor').verdict, 'wrong')
  })

  test('cartes de vocabulaire', () => {
    assert.equal(checkVocab('it is', 'it’s').verdict, 'correct')
    assert.equal(checkVocab('I am sorry', 'I’m sorry').verdict, 'correct')
    assert.equal(checkVocab('bread', 'a loaf of bread / bread').verdict, 'correct')
  })

  test('QCM : deux options qui ne diffèrent que par une contraction sont repérées', () => {
    assert.equal(contractionKey('I’m happy'), contractionKey('I am happy'))
    assert.notEqual(contractionKey('I am happy'), contractionKey('I am sad'))
    assert.ok(sameAnswer('it’s', 'it is'))
  })

  test('dictionnaire anglais : formes de base', () => {
    assert.ok(baseForms('washing').includes('wash'))
    assert.ok(baseForms('stopped').includes('stop'))
    assert.ok(baseForms('babies').includes('baby'))
    assert.ok(baseForms('Peter’s').includes('peter'))
    assert.equal(lookup('bread')?.fr.includes('pain'), true)
    assert.equal(lookup('breads')?.base, 'bread')
    assert.equal(lookup('went')?.fr.includes('allé'), true)
    assert.equal(lookup("it's")?.fr.includes("c'est"), true)
  })

  test('aide vocabulaire : petits mots et noms propres ignorés', () => {
    assert.deepEqual(helpWords('The cat is on the sofa').map((w) => w.toLowerCase()), ['cat', 'sofa'])
    assert.equal(isProperName('Anna', 'Hello Anna'), true)
    assert.equal(isProperName('Hello', 'Hello Anna'), false)
    assert.equal(expressionAround('I look after my grandson', 'look') === null || typeof expressionAround('I look after my grandson', 'look')?.fr === 'string', true)
  })

  test('mots dans une phrase d’exemple (parcours guidé)', () => {
    assert.deepEqual(wordCores('to look after'), ['look after'])
    assert.equal(findInSentence('I buy fresh bread every morning.', 'bread')?.text, 'bread')
    assert.equal(findInSentence('We rented a car.', 'to rent'), null) // « rented » n'est pas le mot « rent » entier
  })
} else {
  test('néerlandais : casse, ponctuation, accents', () => {
    ok('Goedemorgen, schatje!', ['goedemorgen schatje'])
    ok('Ik heet Nunu', ['Ik heet Nunu.'])
    ko('Ik heet Nunu', ['Ik ben Nunu'])
    assert.equal(normalizeForComparison('Café'), 'cafe')
  })

  test('néerlandais : pas de règles anglaises (« ’s » reste un ’s)', () => {
    ko('Het is koud', ['Het’s koud'])
    ok('Mijn moeder is zeventig', ['Mijn moeder is zeventig.'])
  })

  test('dictionnaire néerlandais : pluriels, diminutifs, verbes', () => {
    const base = (w: string) => lookup(w)?.base
    assert.equal(base('huizen'), 'huis')
    assert.equal(base('straten'), 'straat')
    assert.equal(base('boompjes'), 'boom')
    assert.equal(base('speelde'), 'spelen')
    assert.equal(base('blaft'), 'blaffen')
    assert.equal(lookup('werkt')?.fr.includes('travailler'), true)
    assert.equal(lookup('kinderen')?.fr.includes('enfant'), true)
    assert.equal(lookup('gegeten')?.fr.includes('manger'), true)
  })
}
