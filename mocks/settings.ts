import { Algorithm, Model } from '~/types/settings'

export const mockUA: Model[] = [
  {
    active: true,
    type: 'tests',
    title: 'M1',
    desiredValue: 0.9,
    weightingFactor: 8,
    synapticWeight: 1,
    criteria: [
      {
        title: 'Коли між людьми відбувається конфлікт на ґрунті ідей, я віддаю перевагу тій стороні, що:',
        desiredValue: 0,
        synapticWeight: 0,
        answers: [
          { score: 5, title: 'Приймає, визнає конфлікт і намагається висловити його відкрито (5 балів)' },
          { score: 10, title: 'Більше за інших зачіпає мої власні цінності та ідеали (10 балів)' },
          { score: 15, title: 'Краще за інших відображає мої особисті погляди і досвід (15 балів)' },
          { score: 25, title: 'Пасує до ситуації найбільш логічної і послідовної (25 балів)' },
          { score: 30, title: 'Викладає аргументи найбільш коротко і переконливо (30 балів)' }
        ]
      },
      {
        title: 'Коли я починаю працювати над проектом у складі групи, найважливіше для мене:',
        desiredValue: 0,
        synapticWeight: 0,
        answers: [
          { score: 5, title: 'Зрозуміти мету і значення цього проекту (5 балів)' },
          { score: 10, title: 'Розкрити мету і цінності учасників робочої групи (10 балів)' },
          { score: 15, title: 'Визначити, як ми збираємося розробляти даний проект (15 балів)' },
          { score: 20, title: 'Зрозуміти, яку користь цей проект може принести для нашої групи (20 балів)' },
          { score: 30, title: 'Щоб робота над проектом була організована і зрушила з місця (30 балів)' }
        ]
      },
      {
        title: 'Говорячи в цілому, я засвоюю нові ідеї найкраще, коли можу:',
        desiredValue: 0,
        synapticWeight: 0,
        answers: [
          { score: 5, title: 'Повязати їх з поточними чи майбутніми заняттями (5 балів)' },
          { score: 10, title: 'Застосувати їх до конкретних ситуацій (10 балів)' },
          { score: 15, title: 'Зосередитися на них і ретельно їх проаналізувати (15 балів)' },
          { score: 20, title: 'Зрозуміти, наскільки вони подібні до звичних ідей (20 балів)' },
          { score: 30, title: 'Протиставити їх іншим ідеям (30 балів)' }
        ]
      },
      {
        title: 'Імовірно, я буду вважати щось правильним, істинним, якщо це «щось»:',
        desiredValue: 0,
        synapticWeight: 0,
        answers: [
          { score: 5, title: 'Вистояло проти опозиції, витримало опір протилежних підходів (5 балів)' },
          { score: 10, title: 'Узгоджується з іншими речами, яким я вірю (10 балів)' },
          { score: 20, title: 'Було підтверджено практикою (20 балів)' },
          { score: 22, title: 'Піддається логічному і науковому доказу (22 балів)' },
          { score: 25, title: 'Можна перевірити особисто на доступних спостереженню фактах (25 балів)' }
        ]
      },
      {
        title: 'Коли я читаю звіт про роботу, я звертаю найбільше уваги на:',
        desiredValue: 0,
        synapticWeight: 0,
        answers: [
          { score: 10, title: 'Близькість висновків до мого особистого досвіду (10 балів)' },
          { score: 15, title: 'Можливість виконання даних рекомендацій (15 балів)' },
          { score: 20, title: 'Надійність і обґрунтованість результатів фактичними даними (20 балів)' },
          { score: 25, title: 'Розуміння автором цілей та завдань роботи (25 балів)' },
          { score: 30, title: 'Інтерпретацію даних (30 балів)' }
        ]
      },
      {
        title: 'Коли переді мною поставлено завдання, перше, про що я хочу довідатися - це:',
        desiredValue: 0,
        synapticWeight: 0,
        answers: [
          { score: 10, title: 'Який найкращий метод для вирішення даного завдання (10 балів)' },
          { score: 12, title: 'Кому і коли потрібно, щоб це завдання було вирішене (12 балів)' },
          { score: 15, title: 'Чому це завдання варто вирішувати (15 балів)' },
          { score: 20, title: 'Який вплив його вирішення може мати на інші завдання, що доводиться вирішувати (20 балів)' },
          { score: 25, title: 'Яка пряма, негайна користь від вирішення даного завдання (25 балів)' }
        ]
      },
      {
        title: 'Якби мені довелося проходити якесь випробування чи складати іспит, я волів би мати:',
        desiredValue: 0,
        synapticWeight: 0,
        answers: [
          { score: 10, title: 'Набір обєктивних, проблемно-орієнтованих питань з предмета (10 балів)' },
          { score: 12, title: 'Дискусію з тими, хто також проходить іспит (12 балів)' },
          { score: 15, title: 'Усний виклад і демонстрацію того, що я знаю (15 балів)' },
          { score: 20, title: 'Повідомлення у вільній формі про те, як я застосував те, чому навчився (20 балів)' },
          { score: 25, title: 'Письмовий звіт, що охоплює історію питання, теорію і метод (25 балів)' }
        ]
      },
      {
        title: 'Коли я вперше підходжу до якоїсь технічної проблеми, я швидше за все, буду:',
        desiredValue: 0,
        synapticWeight: 0,
        answers: [
          { score: 5, title: 'Намагатись повязати її з більш загальною проблемою чи теорією (5 балів)' },
          { score: 10, title: 'Шукати шляхів і способів вирішення цієї проблеми (10 балів)' },
          { score: 15, title: 'Обмірковувати альтернативні способи її вирішення (15 балів)' },
          { score: 20, title: 'Шукати способи, якими інші вже вирішили цю проблему (20 балів)' },
          { score: 25, title: 'Намагатись знайти найкращу процедуру для її вирішення (25 балів)' }
        ]
      }
    ]
  },
  {
    active: true,
    type: 'values',
    title: 'M2',
    desiredValue: 0,
    weightingFactor: 9,
    synapticWeight: 1,
    criteria: [
      {
        title: 'Авіаційна метеорологія',
        desiredValue: 95,
        synapticWeight: 0,
        answers: []
      },
      {
        title: 'Аеродинаміка та польотна механіка',
        desiredValue: 95,
        synapticWeight: 0,
        answers: []
      },
      {
        title: 'Маса та рівновага літальних апаратів',
        desiredValue: 92,
        synapticWeight: 0,
        answers: []
      },
      {
        title: 'Повітряний зв’язок',
        desiredValue: 95,
        synapticWeight: 0,
        answers: []
      },
      {
        title: 'Авіаційна техніка',
        desiredValue: 97,
        synapticWeight: 0,
        answers: []
      }
    ]
  },
  {
    active: true,
    type: 'values',
    title: 'M3',
    desiredValue: 0,
    weightingFactor: 10,
    synapticWeight: 1,
    criteria: [
      {
        title: 'Практичне навчання з радіолокаційного контролю',
        desiredValue: 95,
        synapticWeight: 0,
        answers: []
      },
      {
        title: 'Навчання на пілотному симуляторі',
        desiredValue: 95,
        synapticWeight: 0,
        answers: []
      },
      {
        title: 'Навчання основам польотів',
        desiredValue: 93,
        synapticWeight: 0,
        answers: []
      }
    ]
  },
  {
    active: true,
    type: 'values',
    title: 'M4',
    desiredValue: 0,
    weightingFactor: 7,
    synapticWeight: 1,
    criteria: [
      {
        title: 'Основи психології пілотів',
        desiredValue: 95,
        synapticWeight: 0,
        answers: []
      },
      {
        title: 'Основи педагогіки',
        desiredValue: 90,
        synapticWeight: 0,
        answers: []
      },
      {
        title: 'Етикет, імідж, бізнес та протокол',
        desiredValue: 90,
        synapticWeight: 0,
        answers: []
      },
      {
        title: 'Робота в колективі',
        desiredValue: 95,
        synapticWeight: 0,
        answers: []
      }
    ]
  },
  {
    title: 'K1',
    type: 'group_criteria',
    active: true,
    desiredValue: 0,
    weightingFactor: 0,
    synapticWeight: 10,
    criteria: [
      {
        answers: [],
        title: 'Успішний досвід роботи над завданнями концепції транспорту в місті, контроль за реалізацією транспортних рішень, зменшення впливу на навколишнє середовище та оцінка дорожнього руху для зменшення аварій',
        desiredValue: 0,
        synapticWeight: 10
      },
      {
        answers: [],
        title: 'Володіння професійними знаннями, вміннями та навичками, необхідними для виконання службових обов’язків, що підтверджується освітою',
        desiredValue: 0,
        synapticWeight: 8
      },
      {
        answers: [],
        title: 'Здатність використовувати професійну та кваліфікаційну підготовку, грамотно, об’єктивно та неупереджено виконувати свої обов’язки',
        desiredValue: 0,
        synapticWeight: 10
      },
      {
        answers: [],
        title: 'Здатність передбачати ризики, пов’язані із впровадженням транспортних рішень зі зменшеним впливом на довкілля та аваріями',
        desiredValue: 0,
        synapticWeight: 9
      },
      {
        answers: [],
        title: 'Можливість складати плани досягнення цілей, структурувати обов\'язки, дотримуватися посадових інструкцій, своєчасно інформувати інших про будь-які зміни',
        desiredValue: 0,
        synapticWeight: 8
      }
    ]
  },
  {
    title: 'K2',
    type: 'group_criteria',
    active: true,
    desiredValue: 0,
    weightingFactor: 0,
    synapticWeight: 6,
    criteria: [
      {
        answers: [],
        title: 'Відкритість для нових ідей, постійний рух вперед, зростання, орієнтація на інноваційні зміни для досягнення максимально ефективного результату',
        desiredValue: 0,
        synapticWeight: 9
      },
      {
        answers: [],
        title: 'Правильна оцінка їх сильних і слабких сторін, постійний розвиток професійних та особистих якостей, бажання вирішувати складні професійні завдання для саморозвитку, накопичення знань та досвіду',
        desiredValue: 0,
        synapticWeight: 7
      },
      {
        answers: [],
        title: 'Здатність здобувати знання та застосовувати їх на практиці',
        desiredValue: 0,
        synapticWeight: 8
      },
      {
        answers: [],
        title: 'Ефективність та систематичність мислення',
        desiredValue: 0,
        synapticWeight: 7
      },
      {
        answers: [],
        title: 'Стресостійкість та емоційна рівновага',
        desiredValue: 0,
        synapticWeight: 7
      }
    ]
  },
  {
    title: 'K3',
    type: 'group_criteria',
    active: true,
    desiredValue: 0,
    weightingFactor: 0,
    synapticWeight: 8,
    criteria: [
      {
        answers: [],
        title: 'Здатність до спілкування, відкритість та здатність до співпраці',
        desiredValue: 0,
        synapticWeight: 8
      },
      {
        answers: [],
        title: 'Здатність сприймати, накопичувати, класифікувати, аналізувати, засвоювати, використовувати та передавати інформацію',
        desiredValue: 0,
        synapticWeight: 8
      },
      {
        answers: [],
        title: 'Навички колективної роботи',
        desiredValue: 0,
        synapticWeight: 8
      },
      {
        answers: [],
        title: 'Вміння керувати людьми, ставити завдання, делегувати повноваження, бажання змагатися в боротьбі за верховенство і владу',
        desiredValue: 0,
        synapticWeight: 9
      },
      {
        answers: [],
        title: 'Зосередьтеся на здобутті та підтримці власної репутації, визнанні, досягненні цілей, повазі серед людей',
        desiredValue: 0,
        synapticWeight: 7
      }
    ]
  }
]

export const mock: Model[] = [
  {
    active: true,
    type: 'tests',
    title: 'M1',
    desiredValue: 0.9,
    weightingFactor: 8,
    synapticWeight: 1,
    criteria: [
      {
        title: 'When there is a conflict between people based on ideas, I prefer the side that:',
        desiredValue: 0,
        synapticWeight: 0,
        answers: [
          { score: 5, title: 'Accepts, acknowledges the conflict and tries to express it openly (5 points)' },
          { score: 10, title: 'Affects my own values ​​and ideals more than others (10 points)' },
          { score: 15, title: 'Better than others reflects my personal views and experiences (15 points)' },
          { score: 25, title: 'Fits the situation most logical and consistent (25 points)' },
          { score: 30, title: 'Presents the arguments most briefly and convincingly (30 points)' }
        ]
      },
      {
        title: 'When I start working on a project as a group, the most important thing for me:',
        desiredValue: 0,
        synapticWeight: 0,
        answers: [
          { score: 5, title: 'Understand the purpose and significance of this project (5 points)' },
          { score: 10, title: 'To reveal the purpose and values of the participants of the working group (10 points)' },
          { score: 15, title: 'Determine how we are going to develop this project (15 points)' },
          { score: 20, title: 'Understand what benefits this project can bring to our group (20 points)' },
          { score: 30, title: 'That the work on the project was organized and moved (30 points)' }
        ]
      },
      {
        title: 'Generally speaking, I absorb new ideas as best when I can:',
        desiredValue: 0,
        synapticWeight: 0,
        answers: [
          { score: 5, title: 'Link them to current or future activities (5 points)' },
          { score: 10, title: 'Apply them to specific situations (10 points)' },
          { score: 15, title: 'Focus on them and analyze them carefully (15 points)' },
          { score: 20, title: 'Understand how similar they are to familiar ideas (20 points)' },
          { score: 30, title: 'Oppose them to other ideas (30 points)' }
        ]
      },
      {
        title: 'I will probably consider something right, true, if it is "something":',
        desiredValue: 0,
        synapticWeight: 0,
        answers: [
          { score: 5, title: 'Resisted the opposition, withstood the resistance of opposing approaches (5 points)' },
          { score: 10, title: 'Consistent with other things I believe (10 points)' },
          { score: 20, title: 'It was confirmed by practice (20 points)' },
          { score: 22, title: 'Subject to logical and scientific proof (22 points)' },
          { score: 25, title: 'You can check in person on the facts available for observation (25 points)' }
        ]
      },
      {
        title: 'When I read a job report, I pay the most attention to:',
        desiredValue: 0,
        synapticWeight: 0,
        answers: [
          { score: 10, title: 'Proximity of conclusions to my personal experience (10 points)' },
          { score: 15, title: 'Ability to implement these recommendations (15 points)' },
          { score: 20, title: 'Reliability and validity of the results with actual data (20 points)' },
          { score: 25, title: 'The author\'s understanding of the goals and objectives of the work (25 points)' },
          { score: 30, title: 'Data interpretation (30 points)' }
        ]
      },
      {
        title: 'When I am faced with a task, the first thing I want to know is:',
        desiredValue: 0,
        synapticWeight: 0,
        answers: [
          { score: 10, title: 'What is the best method to solve this problem (10 points)' },
          { score: 12, title: 'Who and when needs this task to be solved (12 points)' },
          { score: 15, title: 'Why this task should be solved (15 points)' },
          { score: 20, title: 'What impact can its solution have on other tasks to be solved (20 points)' },
          { score: 25, title: 'What a direct, immediate benefit from solving this problem (25 points)' }
        ]
      },
      {
        title: 'If I had to pass a test or an exam, I would prefer to have one:',
        desiredValue: 0,
        synapticWeight: 0,
        answers: [
          { score: 10, title: 'A set of objective, problem-oriented questions on the subject (10 points)' },
          { score: 12, title: 'Discuss with those who also pass the exam (12 points)' },
          { score: 15, title: 'Oral presentation and demonstration of what I know (15 points)' },
          { score: 20, title: 'Free-form messages about how I applied what I learned (20 points)' },
          { score: 25, title: 'Written report covering the history of the issue, theory and method (25 points)' }
        ]
      },
      {
        title: 'When I first approach a technical problem, I most likely will:',
        desiredValue: 0,
        synapticWeight: 0,
        answers: [
          { score: 5, title: 'Try to relate it to a more general problem or theory (5 points)' },
          { score: 10, title: 'Look for ways and means to solve this problem (10 points)' },
          { score: 15, title: 'Consider alternative ways to solve it (15 points)' },
          { score: 20, title: 'Look for ways in which others have already solved this problem (20 points)' },
          { score: 25, title: 'Try to find the best procedure to solve it (25 points)' }
        ]
      }
    ]
  },
  {
    active: true,
    type: 'values',
    title: 'M2',
    desiredValue: 0,
    weightingFactor: 9,
    synapticWeight: 1,
    criteria: [
      {
        title: 'Aviation Meteorology',
        desiredValue: 95,
        synapticWeight: 0,
        answers: []
      },
      {
        title: 'Aerodynamics and flight mechanics',
        desiredValue: 95,
        synapticWeight: 0,
        answers: []
      },
      {
        title: 'Mass and balance of aircraft',
        desiredValue: 92,
        synapticWeight: 0,
        answers: []
      },
      {
        title: 'Air communication',
        desiredValue: 95,
        synapticWeight: 0,
        answers: []
      },
      {
        title: 'Aviation technology',
        desiredValue: 97,
        synapticWeight: 0,
        answers: []
      }
    ]
  },
  {
    active: true,
    type: 'values',
    title: 'M3',
    desiredValue: 0,
    weightingFactor: 10,
    synapticWeight: 1,
    criteria: [
      {
        title: 'Practical training in radar control',
        desiredValue: 95,
        synapticWeight: 0,
        answers: []
      },
      {
        title: 'Training on a pilot simulator',
        desiredValue: 95,
        synapticWeight: 0,
        answers: []
      },
      {
        title: 'Learning the basics of flight',
        desiredValue: 93,
        synapticWeight: 0,
        answers: []
      }
    ]
  },
  {
    active: true,
    type: 'values',
    title: 'M4',
    desiredValue: 0,
    weightingFactor: 7,
    synapticWeight: 1,
    criteria: [
      {
        title: 'Fundamentals of Pilot Psychology',
        desiredValue: 95,
        synapticWeight: 0,
        answers: []
      },
      {
        title: 'Fundamentals of pedagogy',
        desiredValue: 90,
        synapticWeight: 0,
        answers: []
      },
      {
        title: 'Etiquette, image, business and protocol',
        desiredValue: 90,
        synapticWeight: 0,
        answers: []
      },
      {
        title: 'Team work',
        desiredValue: 95,
        synapticWeight: 0,
        answers: []
      }
    ]
  },
  {
    title: 'K1',
    type: 'group_criteria',
    active: true,
    desiredValue: 0,
    weightingFactor: 0,
    synapticWeight: 10,
    criteria: [
      {
        answers: [],
        title: 'Successful experience of work on the tasks of the concept of transport in the city, control over the implementation of transport solutions, reduction of environmental impact and assessment of traffic to reduce accidents',
        desiredValue: 0,
        synapticWeight: 10
      },
      {
        answers: [],
        title: 'Possession of professional knowledge, skills, and abilities necessary for the performance of official duties, which is confirmed by education',
        desiredValue: 0,
        synapticWeight: 8
      },
      {
        answers: [],
        title: 'Ability to use professional and qualification training, to perform their duties competently, objectively and impartially',
        desiredValue: 0,
        synapticWeight: 10
      },
      {
        answers: [],
        title: 'Ability to anticipate risks related to the implementation of transport solutions with reduced environmental impact and accidents',
        desiredValue: 0,
        synapticWeight: 9
      },
      {
        answers: [],
        title: 'The ability to make plans to achieve goals, structure responsibilities, follow job descriptions, timely inform others about any changes',
        desiredValue: 0,
        synapticWeight: 8
      }
    ]
  },
  {
    title: 'K2',
    type: 'group_criteria',
    active: true,
    desiredValue: 0,
    weightingFactor: 0,
    synapticWeight: 6,
    criteria: [
      {
        answers: [],
        title: 'Openness to new ideas, constant movement forward, growth, focus on innovative changes to achieve the most effective result',
        desiredValue: 0,
        synapticWeight: 9
      },
      {
        answers: [],
        title: 'Correct assessment of their strengths and weaknesses, the constant development of professional and personal qualities, the desire to solve complex professional problems for self-development, accumulation of knowledge, and experience',
        desiredValue: 0,
        synapticWeight: 7
      },
      {
        answers: [],
        title: 'Ability to acquire knowledge and implement them in practice',
        desiredValue: 0,
        synapticWeight: 8
      },
      {
        answers: [],
        title: 'Efficiency and systematic thinking',
        desiredValue: 0,
        synapticWeight: 7
      },
      {
        answers: [],
        title: 'Stress resistance and emotional balance',
        desiredValue: 0,
        synapticWeight: 7
      }
    ]
  },
  {
    title: 'K3',
    type: 'group_criteria',
    active: true,
    desiredValue: 0,
    weightingFactor: 0,
    synapticWeight: 8,
    criteria: [
      {
        answers: [],
        title: 'Communication ability, openness and ability to cooperate',
        desiredValue: 0,
        synapticWeight: 8
      },
      {
        answers: [],
        title: 'Ability to perceive, accumulation, classification, analysis, assimilation, use and transmission of information',
        desiredValue: 0,
        synapticWeight: 8
      },
      {
        answers: [],
        title: 'Teamwork skills',
        desiredValue: 0,
        synapticWeight: 8
      },
      {
        answers: [],
        title: 'Ability to manage people, set tasks, delegate authority, desire to compete in the struggle for supremacy and authority',
        desiredValue: 0,
        synapticWeight: 9
      },
      {
        answers: [],
        title: 'Focus on gaining and maintaining their own reputation, recognition, achievement of goals, respect among people',
        desiredValue: 0,
        synapticWeight: 7
      }
    ]
  }
]

export const algorithms: Algorithm = {
  M2: {
    linguisticVariables: [
      {
        title: 'G {The specialist is very well suited to perform the task}',
        k: 1 / 3
      },
      {
        title: 'H {The specialist suitable for the task}',
        k: 1
      },
      {
        title: 'S {The specialist is poorly suited to perform the task}',
        k: 5 / 3
      }
    ]
  },
  M3: {
    linguisticVariables: [
      {
        title: 'H - "low level"',
        a1: 0,
        a2: 2
      },
      {
        title: 'HC - "below average"',
        a1: 2,
        a2: 5
      },
      {
        title: 'C - "average level of the indicator"',
        a1: 5,
        a2: 8
      },
      {
        title: 'B - "high level of the indicator"',
        a1: 8,
        a2: 10
      }
    ],
    synapticWeights: [
      {
        title: 'IE - "important effect"',
        a: 10
      },
      {
        title: 'SE - "significant effect"',
        a: 8
      },
      {
        title: 'ME - "medium effect"',
        a: 6
      },
      {
        title: 'BE - "insignificant effect"',
        a: 4
      },
      {
        title: 'LE - "little or no effect"',
        a: 2
      }
    ],
    originalVariableY: [
      {
        title: 'high',
        a2: 1,
        a1: 0.87
      },
      {
        title: 'above average',
        a2: 0.87,
        a1: 0.67
      },
      {
        title: 'average',
        a2: 0.67,
        a1: 0.37
      },
      {
        title: 'low',
        a2: 0.37,
        a1: 0.21
      },
      {
        title: 'very low',
        a2: 0.21,
        a1: 0
      }
    ]
  }
}
