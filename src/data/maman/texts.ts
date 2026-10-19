import type { Dialogue, Level, McqExercise, ReadingText, WritingTask } from '../../types.ts'

// Maman — lectures, dialogues et sujets d'écrit (A1 → B1). Textes originaux, courts, du vocabulaire des thèmes.

const q = (id: string, prompt: string, options: string[], tags?: string[]): McqExercise => ({ kind: 'mcq', id, prompt, options, answer: 0, tags })

function reading(id: string, title: string, level: Level, module: string, paragraphs: string[], glossary: [string, string][], questions: [string, string[]][]): ReadingText {
  return {
    id, title, level, module, paragraphs,
    glossary: glossary.map(([en, fr]) => ({ en, fr })),
    questions: questions.map(([prompt, options], i) => q(`${id}-q${i + 1}`, prompt, options)),
  }
}

function dialogue(id: string, title: string, level: Level, module: string, context: string, lines: [string, string][], questions: [string, string[]][]): Dialogue {
  return {
    id, title, level, module, context,
    lines: lines.map(([speaker, text]) => ({ speaker, text })),
    questions: questions.map(([prompt, options], i) => q(`${id}-q${i + 1}`, prompt, options)),
  }
}

export const mamanReadingTexts: ReadingText[] = [
  reading('mm-r-anna', 'Hello, I’m Anna', 'A1', 'mm-me', [
    'Hello! My name is Anna and I am sixty-two years old. I am from Belgium and I live in a small house near Liège with my husband, Peter.',
    'We have three children: two sons and a daughter. My daughter, Julie, lives in Brussels with her husband and their two children. My sons live near us. I have four grandchildren and I see them every week.',
    'I am retired, but I am very busy! I like gardening and I cook a lot. On Sundays the whole family gets together for lunch.',
  ], [['retired', 'à la retraite'], ['busy', 'occupé(e)'], ['the whole family', 'toute la famille'], ['to get together', 'se réunir']], [
    ['Where does Anna live?', ['In a small house near Liège', 'In Brussels', 'In a flat in Paris', 'In a village in Spain']],
    ['How many grandchildren does Anna have?', ['Four', 'Two', 'Three', 'Six']],
    ['What does the family do on Sundays?', ['They have lunch together', 'They go to the cinema', 'They go swimming', 'They work in the garden']],
  ]),
  reading('mm-r-house', 'Our house', 'A1', 'mm-home', [
    'We live in a house with a small garden. There are three bedrooms upstairs and a bathroom. Downstairs there is a living room, a kitchen and a toilet.',
    'My favourite room is the kitchen. There is a big table in the middle, and we have breakfast there every morning. There is also a window and, in summer, I open it to hear the birds.',
    'There is a garden behind the house. My husband grows tomatoes and I plant flowers. There is an old tree next to the garden gate, and our cat sleeps under it.',
  ], [['upstairs / downstairs', 'à l’étage / au rez-de-chaussée'], ['in the middle', 'au milieu'], ['to grow', 'cultiver'], ['a gate', 'un portail']], [
    ['How many bedrooms are there?', ['Three', 'Two', 'Four', 'One']],
    ['What is the writer’s favourite room?', ['The kitchen', 'The living room', 'The bathroom', 'The bedroom']],
    ['Where does the cat sleep?', ['Under the old tree', 'In the kitchen', 'On the table', 'In the bathroom']],
  ]),
  reading('mm-r-day', 'A day in the life of Maria', 'A2', 'mm-day', [
    'Maria gets up at seven o’clock every morning. First she takes a shower and gets dressed. Then she has breakfast: a cup of tea and a slice of bread with butter.',
    'At nine she goes shopping. She usually buys fresh bread at the bakery and some vegetables at the market. In the afternoon she looks after her grandson, Tom. They walk in the park and then they bake a cake together.',
    'Yesterday was different. Maria didn’t go shopping because it was raining all day. She stayed at home and she phoned her sister. They talked for an hour! In the evening she cooked dinner and went to bed at ten.',
  ], [['to look after', 'garder, s’occuper de'], ['fresh', 'frais'], ['all day', 'toute la journée'], ['different', 'différent']], [
    ['What does Maria usually do at nine?', ['She goes shopping', 'She goes to bed', 'She phones her sister', 'She bakes a cake']],
    ['Why didn’t Maria go shopping yesterday?', ['Because it was raining', 'Because she was ill', 'Because the shops were closed', 'Because she was tired']],
    ['"She stayed at home." Which tense is it?', ['Past simple', 'Present simple', 'Future', 'Present continuous']],
  ]),
  reading('mm-r-town', 'A day in Bruges', 'A2', 'mm-town', [
    'Bruges is a beautiful old town in the north of Belgium. It is famous for its canals, its churches and its chocolate shops. Every year millions of tourists visit it.',
    'Start your visit in the Market Square, in the middle of the town. There is a tall tower, the Belfry, and you can climb 366 steps to see the whole town. After that, walk along the canals and take a boat trip. It costs about twelve euros and it takes thirty minutes.',
    'There are lots of restaurants and cafés. Try the local specialities: chips with mayonnaise, waffles and, of course, Belgian beer. Don’t forget to buy some chocolate for your family! Bruges is not big, so you can see everything on foot.',
  ], [['a canal', 'un canal'], ['a tower', 'une tour'], ['steps', 'marches'], ['a boat trip', 'une promenade en bateau'], ['local', 'de la région']], [
    ['Where can you climb 366 steps?', ['In the Belfry tower', 'In a church', 'At the station', 'In a chocolate shop']],
    ['How long is the boat trip?', ['About thirty minutes', 'About two hours', 'About ten minutes', 'All day']],
    ['How can you see the town?', ['On foot', 'Only by bus', 'Only by boat', 'Only by train']],
  ]),
  reading('mm-r-holiday', 'Our holiday in Spain', 'A2', 'mm-travel', [
    'Last summer my husband and I went on holiday to Spain. We flew from Brussels to Malaga and the flight was only two and a half hours. We stayed in a small hotel near the beach. Our room was clean and quiet, and breakfast was included.',
    'The weather was perfect: hot and sunny every day. In the morning we went to the beach and swam in the sea. In the afternoon we had a rest, and in the evening we walked along the sea front and had dinner in a little restaurant. The food was delicious!',
    'On Wednesday we visited the old town. We saw a beautiful church and we bought some souvenirs for our grandchildren. We were sad to leave, but we have already decided: next year we are going to visit Portugal.',
  ], [['to fly', 'voyager en avion'], ['quiet', 'calme'], ['the sea front', 'le front de mer'], ['a souvenir', 'un souvenir (objet)']], [
    ['How did they travel to Spain?', ['By plane', 'By train', 'By car', 'By boat']],
    ['What was the weather like?', ['Hot and sunny', 'Cold and rainy', 'Windy and cloudy', 'Foggy']],
    ['What are they going to do next year?', ['Visit Portugal', 'Stay at home', 'Visit Spain again', 'Go to Italy']],
  ]),
  reading('mm-r-weather', 'The weather in Belgium', 'A2', 'mm-weather', [
    'People often say that the weather in Belgium is changeable. It is true! In one day you can have sunshine, rain and wind. So Belgians always say: “Take an umbrella, just in case!”',
    'In spring, the temperature is mild and the flowers start to grow. Summers are usually warm, with some hot days, but it can rain too. Autumn is windy and wet, and the leaves turn yellow and red. In winter it is cold, and it sometimes snows, but not a lot.',
    'If you visit Belgium, bring a warm jacket, a raincoat and a pair of comfortable shoes. And remember: if the weather is bad, there is always a good café nearby!',
  ], [['changeable', 'changeant'], ['mild', 'doux (météo)'], ['wet', 'humide, pluvieux'], ['just in case', 'au cas où'], ['nearby', 'tout près']], [
    ['What do Belgians say about the weather?', ['It is changeable', 'It is always hot', 'It is always cold', 'It never rains']],
    ['What is autumn like in Belgium?', ['Windy and wet', 'Hot and dry', 'Snowy', 'Foggy and warm']],
    ['What should you bring when you visit?', ['A warm jacket and a raincoat', 'Only sunglasses', 'Only a swimsuit', 'Nothing special']],
  ]),
]

export const mamanDialogues: Dialogue[] = [
  dialogue('mm-d-meeting', 'Nice to meet you', 'A1', 'mm-me', 'Anna meets Susan, the new neighbour, in the street.', [
    ['Anna', 'Hello! I’m Anna. I live in the house next door.'],
    ['Susan', 'Hello, Anna. I’m Susan. Nice to meet you!'],
    ['Anna', 'Nice to meet you too. Are you new here?'],
    ['Susan', 'Yes, we moved here last week. I live here with my husband and our two children.'],
    ['Anna', 'How old are your children?'],
    ['Susan', 'My son is six and my daughter is nine.'],
    ['Anna', 'Lovely! I have four grandchildren. Where are you from?'],
    ['Susan', 'I’m from Scotland, but my husband is Belgian.'],
    ['Anna', 'Welcome to the street! Come for a coffee one day.'],
    ['Susan', 'Thank you, that’s very kind. See you soon!'],
  ], [
    ['When did Susan move to the street?', ['Last week', 'Last year', 'Yesterday', 'Last month']],
    ['How old is Susan’s daughter?', ['Nine', 'Six', 'Four', 'Twelve']],
    ['Where is Susan from?', ['Scotland', 'Belgium', 'England', 'Ireland']],
  ]),
  dialogue('mm-d-shop', 'At the market', 'A1', 'mm-food', 'Anna buys vegetables at the market.', [
    ['Seller', 'Good morning! Can I help you?'],
    ['Anna', 'Good morning. A kilo of potatoes, please.'],
    ['Seller', 'Here you are. Anything else?'],
    ['Anna', 'Yes. How much are the tomatoes?'],
    ['Seller', 'Three euros a kilo.'],
    ['Anna', 'I’d like half a kilo, please. And some carrots.'],
    ['Seller', 'How many carrots would you like?'],
    ['Anna', 'About six, please. That’s all, thank you. How much is it?'],
    ['Seller', 'That’s seven euros fifty.'],
    ['Anna', 'Here you are. Thank you, goodbye!'],
  ], [
    ['How much are the tomatoes?', ['Three euros a kilo', 'Seven euros fifty', 'Half a kilo', 'Six euros']],
    ['How many tomatoes does Anna buy?', ['Half a kilo', 'One kilo', 'Two kilos', 'Six']],
    ['How much does Anna pay?', ['Seven euros fifty', 'Three euros', 'Ten euros', 'Six euros']],
  ]),
  dialogue('mm-d-restaurant', 'A table for two', 'A2', 'mm-eat-out', 'Anna and Peter go to a restaurant.', [
    ['Waiter', 'Good evening. Do you have a reservation?'],
    ['Peter', 'Yes, a table for two in the name of Martin.'],
    ['Waiter', 'Of course, please follow me. Here is the menu. Can I get you something to drink?'],
    ['Anna', 'A glass of white wine, please.'],
    ['Peter', 'And a bottle of still water for me.'],
    ['Waiter', 'Are you ready to order?'],
    ['Anna', 'Yes. I’ll have the soup, then the fish, please.'],
    ['Peter', 'And I’d like the chicken. I’m allergic to nuts, so please no nuts.'],
    ['Waiter', 'No problem. Enjoy your meal!'],
    ['Peter', 'Excuse me, could we have the bill, please? The food was delicious!'],
  ], [
    ['What does Anna order to drink?', ['A glass of white wine', 'Still water', 'A beer', 'A coffee']],
    ['Why does Peter mention nuts?', ['He is allergic to nuts', 'He loves nuts', 'He wants a dessert', 'The waiter asks about nuts']],
    ['What does Anna eat?', ['Soup and fish', 'Chicken', 'Soup and chicken', 'Only a salad']],
  ]),
  dialogue('mm-d-clothes-shop', 'Trying on a coat', 'A2', 'mm-clothes', 'Anna is looking for a winter coat.', [
    ['Assistant', 'Can I help you?'],
    ['Anna', 'Yes, I’m looking for a warm coat. Do you have this one in blue?'],
    ['Assistant', 'Yes, we do. What size are you?'],
    ['Anna', 'Medium, I think. Can I try it on?'],
    ['Assistant', 'Of course. The fitting room is over there.'],
    ['Anna', 'It’s a bit too small. Do you have a larger size?'],
    ['Assistant', 'Yes, here you are. How is this one?'],
    ['Anna', 'It fits well and I like the colour. How much is it?'],
    ['Assistant', 'It’s on sale: ninety euros instead of a hundred and thirty.'],
    ['Anna', 'Lovely, I’ll take it. Can I pay by card?'],
  ], [
    ['What colour is the coat?', ['Blue', 'Red', 'Black', 'Green']],
    ['Why does Anna ask for a larger size?', ['The first coat is too small', 'It is too expensive', 'She doesn’t like the colour', 'It is too long']],
    ['How much does the coat cost now?', ['Ninety euros', 'A hundred and thirty euros', 'Fifty euros', 'Seventy euros']],
  ]),
  dialogue('mm-d-directions', 'Excuse me, where is the museum?', 'A2', 'mm-town', 'A tourist asks Anna the way in the town centre.', [
    ['Tourist', 'Excuse me, could you tell me the way to the museum, please?'],
    ['Anna', 'Of course. Go straight on and then turn left at the traffic lights.'],
    ['Tourist', 'Is it far from here?'],
    ['Anna', 'No, it’s about five minutes on foot.'],
    ['Tourist', 'And where exactly is it?'],
    ['Anna', 'It’s on the right, opposite the church and next to the bank. You can’t miss it.'],
    ['Tourist', 'What time does it open?'],
    ['Anna', 'At ten o’clock, I think. But it’s closed on Mondays.'],
    ['Tourist', 'Thank you very much!'],
    ['Anna', 'You’re welcome. Enjoy your visit!'],
  ], [
    ['Where must the tourist turn left?', ['At the traffic lights', 'At the bank', 'At the church', 'At the station']],
    ['How long does it take to walk to the museum?', ['About five minutes', 'About half an hour', 'About an hour', 'Two minutes']],
    ['When is the museum closed?', ['On Mondays', 'On Sundays', 'On Fridays', 'It is never closed']],
  ]),
  dialogue('mm-d-guests', 'Welcome to our home', 'A2', 'mm-friends', 'Anna and Peter welcome friends for dinner.', [
    ['Anna', 'Hello! Come in, come in! Welcome!'],
    ['Sarah', 'Hello Anna! These are for you: some flowers and a bottle of wine.'],
    ['Anna', 'Oh, thank you, that’s so kind! Can I take your coats?'],
    ['Sarah', 'Thank you. What a lovely house!'],
    ['Anna', 'Thank you. Please make yourselves at home. Would you like something to drink?'],
    ['Tom', 'A glass of water, please.'],
    ['Peter', 'And would you like some cheese while you wait? Please help yourself.'],
    ['Sarah', 'Mmm, delicious. Can I help in the kitchen?'],
    ['Anna', 'No, thank you, everything is ready. Dinner is in ten minutes.'],
  ], [
    ['What do the guests bring?', ['Flowers and a bottle of wine', 'A cake', 'Nothing', 'A present for Peter']],
    ['What does Tom want to drink?', ['A glass of water', 'Wine', 'Tea', 'Coffee']],
    ['When is dinner?', ['In ten minutes', 'In an hour', 'Now', 'Tomorrow']],
  ]),
  dialogue('mm-d-hotel', 'Checking in', 'A2', 'mm-travel', 'Anna and Peter arrive at their hotel.', [
    ['Receptionist', 'Good afternoon. Can I help you?'],
    ['Peter', 'Good afternoon. We have a reservation in the name of Martin.'],
    ['Receptionist', 'Yes, a double room for three nights. Here is your key, room 214, on the second floor.'],
    ['Anna', 'Is breakfast included?'],
    ['Receptionist', 'Yes, it is. Breakfast is from seven to ten in the restaurant.'],
    ['Peter', 'Is there Wi-Fi in the room?'],
    ['Receptionist', 'Yes, the password is on the card. The lift is over there.'],
    ['Anna', 'Thank you. Could you call a taxi for tomorrow morning at nine?'],
    ['Receptionist', 'Of course. Enjoy your stay!'],
  ], [
    ['How long do they stay?', ['Three nights', 'One night', 'A week', 'Two nights']],
    ['What is the room number?', ['214', '412', '124', '241']],
    ['What does Anna ask the receptionist to do?', ['Call a taxi', 'Clean the room', 'Bring breakfast', 'Change the room']],
  ]),
  dialogue('mm-d-doctor', 'At the doctor’s', 'A2', 'mm-health', 'Anna visits the doctor because she doesn’t feel well.', [
    ['Doctor', 'Good morning, Mrs Martin. What’s the problem?'],
    ['Anna', 'I don’t feel well. I have a cough and a headache.'],
    ['Doctor', 'How long have you had the cough?'],
    ['Anna', 'For about four days.'],
    ['Doctor', 'Do you have a temperature?'],
    ['Anna', 'Yes, a little. It was thirty-eight yesterday.'],
    ['Doctor', 'Are you allergic to anything?'],
    ['Anna', 'Yes, I’m allergic to penicillin.'],
    ['Doctor', 'OK. You should rest and drink a lot of water. Take these tablets twice a day, and come back if you’re not better in a week.'],
  ], [
    ['How long has Anna had the cough?', ['About four days', 'Two weeks', 'One day', 'A month']],
    ['What is Anna allergic to?', ['Penicillin', 'Nuts', 'Dust', 'Nothing']],
    ['How often must she take the tablets?', ['Twice a day', 'Once a week', 'Three times a day', 'Every hour']],
  ]),
  dialogue('mm-d-phone', 'Making an appointment', 'A2', 'mm-phone', 'Anna phones the hairdresser’s.', [
    ['Receptionist', 'Good morning, Style Hair. How can I help you?'],
    ['Anna', 'Hello, this is Anna Martin. I’d like to make an appointment, please.'],
    ['Receptionist', 'Of course. Are you free on Thursday?'],
    ['Anna', 'I’m afraid I can’t come on Thursday. Is Friday possible?'],
    ['Receptionist', 'Yes, we have a free place at ten o’clock.'],
    ['Anna', 'Sorry, could you repeat that, please? Ten o’clock or two o’clock?'],
    ['Receptionist', 'Ten o’clock in the morning.'],
    ['Anna', 'Perfect, that suits me. Thank you.'],
    ['Receptionist', 'See you on Friday, Mrs Martin. Goodbye!'],
  ], [
    ['Why can’t Anna come on Thursday?', ['She isn’t free', 'The shop is closed', 'She is ill', 'She is on holiday']],
    ['What time is the appointment?', ['Ten o’clock on Friday', 'Two o’clock on Friday', 'Ten o’clock on Thursday', 'Nine o’clock on Friday']],
    ['Why does Anna say “Could you repeat that?”', ['She didn’t hear the time well', 'She is angry', 'She wants another day', 'She wants to cancel']],
  ]),
  dialogue('mm-d-colleague', 'Asking a colleague for help', 'A2', 'mm-work', 'Anna asks her colleague Mark for help with a machine.', [
    ['Anna', 'Excuse me, Mark. Could you help me, please?'],
    ['Mark', 'Of course. What’s the problem?'],
    ['Anna', 'There’s a problem with the machine. It isn’t working and a red light is on.'],
    ['Mark', 'Let me have a look. Hmm, I think it’s broken. Have you told the manager?'],
    ['Anna', 'Not yet. I’ve just found it.'],
    ['Mark', 'OK. I’ll call the maintenance team. They can fix it today.'],
    ['Anna', 'Thank you so much. Could you also show me how to restart it afterwards?'],
    ['Mark', 'Sure, no problem. It’s easy. Come to my office after lunch.'],
  ], [
    ['What is the problem?', ['The machine isn’t working', 'The door is closed', 'Anna is ill', 'The office is cold']],
    ['Who will Mark call?', ['The maintenance team', 'The manager', 'A taxi', 'A customer']],
    ['When will Mark show Anna how to restart the machine?', ['After lunch', 'Tomorrow', 'Now', 'On Monday']],
  ]),
]

const task = (id: string, module: string, level: Level, type: WritingTask['type'], title: string, prompt: string, tipsFr: string, minWords: number, maxWords: number, targetPhrases: string[], checklist: string[], model: string): WritingTask => ({
  id, module, level, type, title, prompt, tipsFr, minWords, maxWords, targetPhrases, checklist, model,
})

export const mamanWritingTasks: WritingTask[] = [
  task('mm-w-me', 'mm-me', 'A1', 'email', 'Se présenter par e-mail', 'Write a short e-mail to a new friend. Introduce yourself: your name, your age, where you live, your family and your hobbies.', 'Utilise I’m… / I live… / I have… / I like… Pas de « I have 62 years » : on dit I’m 62.', 40, 100, ['I’m', 'I live', 'I have', 'I like'], ['Un début (Hello …,) et une fin (Best wishes,)', 'L’âge avec « I’m »', 'Au moins une phrase sur la famille', 'Un -s avec he / she (my son lives…)'],
    `Hello Susan,

Nice to meet you! My name is Anna and I’m 62. I live in a small house near Liège with my husband, Peter.

I have three children and four grandchildren. My daughter lives in Brussels and my sons live near us.

I’m retired. I like gardening and cooking, and I love walking by the river.

Best wishes,
Anna`),
  task('mm-w-home', 'mm-home', 'A1', 'story', 'Décrire sa maison', 'Describe your house or flat: how many rooms are there, where are they, and what is your favourite room? Why?', 'There is / there are, prépositions de lieu (upstairs, next to, behind), because.', 50, 110, ['There is', 'There are', 'upstairs', 'my favourite'], ['There is + singulier, there are + pluriel', 'Au moins 3 pièces', 'Une raison avec because'],
    `We live in a house near the town centre. There are three bedrooms upstairs and a bathroom. Downstairs there is a living room, a kitchen and a small toilet. There is also a garden behind the house.

My favourite room is the kitchen because we have breakfast there and I like cooking. There is a big table in the middle and a window next to the sink. In the morning the sun comes in and it is very warm.`),
  task('mm-w-day', 'mm-day', 'A2', 'story', 'Ma journée type', 'Describe a normal day: when do you get up, what do you do in the morning, in the afternoon and in the evening?', 'Présent simple + heures (at seven) + first / then / after that / finally + usually / always / sometimes.', 60, 130, ['First', 'Then', 'After that', 'usually', 'at'], ['Les heures avec « at »', 'Au moins 3 connecteurs', 'Les adverbes avant le verbe'],
    `I usually get up at seven o’clock. First I take a shower and then I have breakfast. After that I go shopping at the market.

In the afternoon I often look after my grandson. We walk in the park or we bake a cake. At half past six we have dinner and then I watch TV or I read a book. I go to bed at about ten.`),
  task('mm-w-recipe', 'mm-food', 'A2', 'procedure', 'Écrire une recette', 'Write a simple recipe for a dish you like. List the ingredients and explain how to make it, step by step.', 'L’impératif (chop, add, bake), les quantités (a kilo of, a little, a few), first / then / finally.', 60, 140, ['First', 'Then', 'Finally', 'a little'], ['Une liste d’ingrédients avec quantités', 'L’impératif pour chaque étape', 'first / then / finally'],
    `Tomato soup
Ingredients: one kilo of tomatoes, two onions, a little olive oil, salt and pepper, half a litre of water.

First, chop the onions and fry them in the oil for five minutes. Then add the tomatoes and the water. Cook for twenty minutes. Finally, add some salt and pepper and mix everything. Serve with fresh bread. Enjoy your meal!`),
  task('mm-w-city', 'mm-town', 'A2', 'story', 'Présenter sa ville à un touriste', 'A friend from England is coming to visit you. Write about your town: what is there to see, where can he or she eat, and how can he or she get around?', 'There is / there are, prépositions de lieu, impératif pour les conseils, you can…', 60, 140, ['There is', 'There are', 'You can', 'opposite'], ['There is / there are', 'Au moins 3 lieux avec une préposition de lieu', 'Un conseil avec « you can… »'],
    `My town is small but very pretty. There is a big square in the middle with a market on Saturdays. There are two churches and a castle. The castle is opposite the station.

There are lots of restaurants and cafés. You can try our local cheese and, of course, Belgian beer! You can see everything on foot, but there is also a bus from the station. Don’t forget your umbrella: it often rains!`),
  task('mm-w-invitation', 'mm-friends', 'A2', 'email', 'Inviter des amis', 'Write an e-mail to invite friends to dinner or a barbecue. Say the day, the time and the place, and ask if they can come.', 'Would you like to…? / Can you come…? at + heure, on + jour. Et Please let me know.', 50, 110, ['Would you like', 'Can you come', 'at', 'on'], ['Le jour avec « on » et l’heure avec « at »', 'Une question avec Would you like to… ?', 'Une formule finale (Please let me know, See you soon…)'],
    `Dear Sarah and Tom,

Would you like to come to dinner at our house on Saturday 14 June? We’re having a barbecue in the garden. Can you come at about seven o’clock?

Please bring a bottle of wine if you like! We have lots of food, so you don’t need to bring anything else. Please let me know if you can come.

See you soon,
Anna`),
  task('mm-w-postcard', 'mm-travel', 'A2', 'story', 'Une carte postale de vacances', 'Write a postcard to a friend from your holiday. Say where you are, what the weather is like and what you did yesterday.', 'Present simple / continuous pour le moment (We are staying…), past simple pour hier (we went…).', 40, 90, ['We are', 'The weather', 'Yesterday', 'we went'], ['Un présent (We are…)', 'Un passé (Yesterday we went…)', 'Une formule pour finir (See you soon, Love…)'],
    `Dear Julie,

Greetings from Spain! We are staying in a small hotel near the beach. The weather is hot and sunny every day.

Yesterday we went to the old town and we visited a beautiful church. Today we are relaxing by the sea. The food is delicious!

See you soon,
Mum and Dad`),
  task('mm-w-message', 'mm-phone', 'A2', 'email', 'Un court message pour un rendez-vous', 'Write a short message (e-mail or text) to a dentist, a doctor or a hairdresser to change your appointment.', 'I’m sorry, I can’t come on… Could we change it? Are you free on…? Thank you.', 30, 80, ['I’m sorry', 'Could we', 'Are you free', 'Thank you'], ['Des excuses (I’m sorry)', 'Une demande polie (Could we…?)', 'Un jour ET une heure proposés'],
    `Dear Dr Martin,

I’m sorry, I can’t come on Thursday at ten o’clock because I’m ill. Could we change my appointment, please? Are you free on Friday morning?

Thank you very much.
Anna Martin`),
  task('mm-w-work', 'mm-work', 'B1', 'email', 'Se présenter à de nouveaux collègues', 'Write a short message to introduce yourself to the new colleagues in your team: your job, how long you have worked here, and what you like about it.', 'Present simple (I work in…) et present perfect + for / since (I’ve worked here for ten years).', 60, 120, ['I work', 'I’ve worked', 'for', 'I like'], ['Présent simple pour le métier', 'Present perfect avec for ou since', 'Une phrase sur ce qu’on aime'],
    `Hello everyone,

My name is Anna and I work in the maintenance team. I’m responsible for checking the machines every morning.

I’ve worked in this company for twelve years, since 2013. I like my job because my colleagues are very kind and every day is different.

If you have a problem, please ask me. I’m happy to help!

Anna`),
  task('mm-w-weekend', 'mm-hobbies', 'A2', 'story', 'Raconter son week-end', 'Write about your last weekend: where did you go, what did you do, and who was with you? Was it good?', 'Past simple : verbes réguliers (-ed) et irréguliers (went, had, saw, ate). Négatif : didn’t + verbe de base.', 60, 130, ['went', 'was', 'had', 'didn’t'], ['Tous les verbes au passé', 'Au moins 3 verbes irréguliers', 'Une phrase négative avec didn’t'],
    `Last weekend was lovely. On Saturday morning I went to the market and bought some fresh fruit. In the afternoon my daughter and my grandchildren came to see me. We baked a cake together and we played in the garden.

On Sunday we had lunch at a restaurant. The food was delicious, but we didn’t have a dessert because we were full. In the evening I was tired, so I watched a film and went to bed early.`),
]
