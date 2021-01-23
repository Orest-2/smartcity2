import { Algorithm, Model } from '~/types/settings'

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
    ]
  }
}
