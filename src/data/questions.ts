import type { BilingualText } from '../utils/bilingual'

export type QuestionType = 'mcq' | 'short' | 'case';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  type: QuestionType;
  topic: string;
  difficulty: Difficulty;
  question: BilingualText;
  options?: BilingualText[];
  correctIndex?: number;
  answer: BilingualText;
  explanation: BilingualText;
  reference: BilingualText;
  tags: string[];
}

export const questionsData: Question[] = [
  // ─── 选择题 MCQ ───────────────────────────────────────────────
  {
    id: 'q001',
    type: 'mcq',
    topic: 'law',
    difficulty: 'easy',
    question: 'Under section 65 of the Migration Act 1958, if an applicant satisfies all the criteria for a visa, the Minister:',
    options: [
      'A. Has discretion to grant or refuse the visa',
      'B. Must grant the visa',
      'C. May grant the visa after considering public interest',
      'D. Must refuse the visa pending further review',
    ],
    correctIndex: 1,
    answer: 'B. Must grant the visa',
    explanation: 'Section 65 of the Migration Act 1958 is a non-discretionary provision. If all criteria are satisfied, the Minister MUST (has no choice but to) grant the visa. Similarly, if any criterion is not satisfied, the Minister MUST refuse the visa.',
    reference: 'Migration Act 1958 s.65',
    tags: ['s.65', 'must grant', 'decision-making'],
  },
  {
    id: 'q002',
    type: 'mcq',
    topic: 'ethics',
    difficulty: 'easy',
    question: '在向客户提供移民协助之前，注册移民代理必须首先：',
    options: [
      'A. 向MARA报告客户情况',
      'B. 与客户签订书面代理协议',
      'C. 获得部长的书面批准',
      'D. 完成相关签证类别的CPD培训',
    ],
    correctIndex: 1,
    answer: 'B. 与客户签订书面代理协议',
    explanation: '根据《行为准则2021》，注册移民代理在提供移民协助前必须与客户签订书面代理服务协议，告知服务范围、费用和投诉程序。这是代理人的基本义务。',
    reference: 'Code of Conduct for Registered Migration Agents 2021',
    tags: ['Code of Conduct', 'written agreement', 'ethics'],
  },
  {
    id: 'q003',
    type: 'mcq',
    topic: 'visa',
    difficulty: 'easy',
    question: 'A student visa (Subclass 500) holder may generally work how many hours per fortnight (two-week period) once their course has commenced?',
    options: [
      'A. 20 hours per fortnight',
      'B. 40 hours per fortnight',
      'C. 48 hours per fortnight',
      'D. There is no working limit for student visa holders',
    ],
    correctIndex: 2,
    answer: 'C. 48 hours per fortnight',
    explanation: 'Condition 8104 currently limits Student visa holders to working 48 hours per fortnight once their course has commenced. Before the course commences, work is not permitted. Note: This was temporarily lifted during COVID and subsequently revised.',
    reference: 'Migration Regulations 1994, Schedule 8, Condition 8104',
    tags: ['500', 'student visa', '8104', 'work conditions'],
  },
  {
    id: 'q004',
    type: 'mcq',
    topic: 'law',
    difficulty: 'medium',
    question: 'Under section 501 of the Migration Act 1958, which of the following does NOT constitute a "substantial criminal record"?',
    options: [
      'A. A sentence of 12 months imprisonment',
      'B. Two or more sentences of any term of imprisonment',
      'C. A sentence of 6 months imprisonment with good behaviour bond',
      'D. A life sentence',
    ],
    correctIndex: 2,
    answer: 'C. A sentence of 6 months imprisonment with good behaviour bond',
    explanation: 'Under s.501(7), a "substantial criminal record" requires: a death sentence; life imprisonment; 12 months or more imprisonment; or two or more terms of imprisonment of any length. A single sentence of 6 months does not meet the threshold, even with a good behaviour bond. The good behaviour bond may be relevant to the overall character assessment but does not itself constitute a substantial criminal record.',
    reference: 'Migration Act 1958 s.501(7)',
    tags: ['s.501', 'character', 'substantial criminal record'],
  },
  {
    id: 'q005',
    type: 'mcq',
    topic: 'visa',
    difficulty: 'medium',
    question: '申请Subclass 189 (技术独立)签证时，积分测试中最高年龄积分(30分)对应的年龄段是：',
    options: [
      'A. 18-24岁',
      'B. 25-32岁',
      'C. 33-39岁',
      'D. 25-39岁',
    ],
    correctIndex: 1,
    answer: 'B. 25-32岁',
    explanation: '根据Schedule 6D，积分测试年龄分值为：18-24岁25分；25-32岁30分（最高）；33-39岁25分；40-44岁15分。45岁及以上无法申请技术移民类签证。',
    reference: 'Migration Regulations 1994, Schedule 6D',
    tags: ['189', 'points test', 'age', 'Schedule 6D'],
  },
  {
    id: 'q006',
    type: 'mcq',
    topic: 'review',
    difficulty: 'medium',
    question: 'Which of the following migration decisions is subject to merits review by the Administrative Appeals Tribunal (AAT)?',
    options: [
      'A. A decision made personally by the Minister under s.501(3) to cancel a visa',
      'B. A delegate\'s decision to refuse a Partner Visa (Subclass 820)',
      'C. A decision by the Immigration Assessment Authority (IAA)',
      'D. A Federal Court judicial review decision',
    ],
    correctIndex: 1,
    answer: "B. A delegate's decision to refuse a Partner Visa (Subclass 820)",
    explanation: 'The AAT Migration and Refugee Division (MRD) reviews delegate decisions on most visa refusals and cancellations. Personal Ministerial decisions under s.501(3) are NOT subject to AAT review. IAA decisions are separate from AAT. Federal Court decisions are judicial, not merits review.',
    reference: 'Migration Act 1958 s.348',
    tags: ['AAT', 'MRD', 'review', 'merits review'],
  },
  {
    id: 'q007',
    type: 'mcq',
    topic: 'visa',
    difficulty: 'medium',
    question: '伴侣签证申请人通常需要等待多长时间，才能从临时820签证升级为永久801签证？',
    options: [
      'A. 6个月',
      'B. 1年',
      'C. 约2年',
      'D. 5年',
    ],
    correctIndex: 2,
    answer: 'C. 约2年',
    explanation: '820伴侣签证通常有约两年的等待期才能转为801永久签证。例外情况：①关系已持续3年以上（无子女）或2年以上（有子女）可加快处理；②发生家庭暴力分居后仍可继续申请。',
    reference: 'Migration Regulations 1994, Schedule 2, Subclass 820/801',
    tags: ['820', '801', 'partner', 'waiting period'],
  },
  {
    id: 'q008',
    type: 'mcq',
    topic: 'procedure',
    difficulty: 'medium',
    question: 'A non-citizen\'s visa is cancelled under s.116. Under which provision must natural justice generally be afforded before the cancellation?',
    options: [
      'A. Section 57',
      'B. Sections 119-120',
      'C. Section 501',
      'D. Regulation 2.07',
    ],
    correctIndex: 1,
    answer: 'B. Sections 119-120',
    explanation: 'Before cancelling a visa under s.116, the visa holder must generally be given an opportunity to respond. Sections 119-120 specifically provide for notice of proposed cancellation and opportunity to show cause. Section 57 relates to natural justice for visa applications, not cancellations. The obligation to afford natural justice applies unless a specific exception applies (e.g., offshore cancellation under s.128).',
    reference: 'Migration Act 1958 ss.119-120',
    tags: ['s.116', 'cancellation', 'natural justice', 's.119'],
  },
  {
    id: 'q009',
    type: 'mcq',
    topic: 'law',
    difficulty: 'hard',
    question: 'Which of the following correctly describes the concept of "jurisdictional error" in the context of judicial review of migration decisions?',
    options: [
      'A. Any error made by the decision-maker, whether factual or legal',
      'B. An error that causes the decision-maker to lack authority or exceed its authority to make the decision',
      'C. A factual error that leads to an incorrect outcome',
      'D. An error that results in a decision being unfair to the applicant',
    ],
    correctIndex: 1,
    answer: 'B. An error that causes the decision-maker to lack authority or exceed its authority to make the decision',
    explanation: 'Jurisdictional error occurs when a decision-maker acts without jurisdiction, exceeds their jurisdiction, or makes certain fundamental legal errors. In the migration context, courts can only review and quash migration decisions on the basis of jurisdictional error (s.476). Mere factual errors or even non-jurisdictional legal errors are not generally reviewable. Key examples include failing to consider a relevant matter, considering an irrelevant matter, breach of natural justice, or misconstruing the law.',
    reference: 'Migration Act 1958 s.476; Kirk v Industrial Court (2010) 239 CLR 531',
    tags: ['judicial review', 'jurisdictional error', 's.476'],
  },
  {
    id: 'q010',
    type: 'mcq',
    topic: 'visa',
    difficulty: 'medium',
    question: '根据家庭平衡测试(Balance of Family Test)，父母签证(Subclass 103)申请人须满足哪项要求？',
    options: [
      'A. 至少一名子女在澳大利亚定居',
      'B. 超过一半的在世子女在澳大利亚定居',
      'C. 所有子女均须在澳大利亚定居',
      'D. 父母须已在澳大利亚居住一年以上',
    ],
    correctIndex: 1,
    answer: 'B. 超过一半的在世子女在澳大利亚定居',
    explanation: '父母签证的家庭平衡测试要求：申请父母在世子女中，定居在澳大利亚的人数必须超过定居在其他任何单一国家的人数。简单来说，需要超过一半的在世子女在澳大利亚定居（或多于任何其他单一国家中的子女数）。',
    reference: 'Migration Regulations 1994, reg.1.05',
    tags: ['parent visa', '103', 'balance of family test'],
  },
  {
    id: 'q011',
    type: 'mcq',
    topic: 'visa',
    difficulty: 'hard',
    question: 'An employer wishes to sponsor a worker for a Subclass 482 visa. The TSMIT (Temporary Skilled Migration Income Threshold) as of July 2023 is:',
    options: [
      'A. AUD $53,900 per year',
      'B. AUD $65,000 per year',
      'C. AUD $70,000 per year',
      'D. AUD $80,000 per year',
    ],
    correctIndex: 2,
    answer: 'C. AUD $70,000 per year',
    explanation: 'From 1 July 2023, the TSMIT increased to AUD $70,000 per year (before tax). Sponsors must pay their 482 visa nominees at least the TSMIT or the annual earnings equivalent for the nominated occupation, whichever is higher. This threshold is regularly reviewed and may change — agents must always check the current figure.',
    reference: 'Migration Regulations 1994; TSMIT policy',
    tags: ['482', 'TSS', 'TSMIT', 'salary threshold'],
  },
  {
    id: 'q012',
    type: 'mcq',
    topic: 'ethics',
    difficulty: 'medium',
    question: '注册移民代理发现与客户存在利益冲突时，应该：',
    options: [
      'A. 立即停止代理，无需告知客户',
      'B. 向MARA报告利益冲突情况',
      'C. 向客户充分披露利益冲突，并在取得同意后才可继续代理',
      'D. 在不告知客户的情况下继续代理，只要代理人认为不会影响客户利益',
    ],
    correctIndex: 2,
    answer: 'C. 向客户充分披露利益冲突，并在取得同意后才可继续代理',
    explanation: '行为准则要求代理人在存在利益冲突时，必须向客户充分披露利益冲突的性质，并只有在客户知情同意后才可继续代理。如果利益冲突无法通过披露解决，代理人应考虑停止代理。',
    reference: 'Code of Conduct for Registered Migration Agents 2021',
    tags: ['Code of Conduct', 'conflict of interest', 'disclosure'],
  },
  {
    id: 'q013',
    type: 'mcq',
    topic: 'law',
    difficulty: 'medium',
    question: 'Under the Migration Act 1958, what is the consequence if a person\'s Bridging Visa A (BVA) holder leaves Australia without obtaining a Bridging Visa B (BVB)?',
    options: [
      'A. The BVA is automatically suspended until they return',
      'B. The BVA ceases to be in effect',
      'C. They are penalised with a fine of $5,000',
      'D. They must re-apply for the BVA from overseas',
    ],
    correctIndex: 1,
    answer: 'B. The BVA ceases to be in effect',
    explanation: 'A Bridging Visa A ceases to be in effect when the holder departs Australia. If they want to travel and return, they must first obtain a Bridging Visa B (BVB) which allows a temporary departure and return. This is a critical point agents must advise clients on — leaving without a BVB means the BVA (and potentially a pending application protection) is lost.',
    reference: 'Migration Act 1958; Migration Regulations 1994',
    tags: ['BVA', 'BVB', 'bridging visa', 'departure'],
  },
  {
    id: 'q014',
    type: 'mcq',
    topic: 'visa',
    difficulty: 'easy',
    question: 'The Subclass 190 (Skilled Nominated) visa differs from the Subclass 189 (Skilled Independent) visa in that the 190 visa:',
    options: [
      'A. Is a temporary visa only',
      'B. Requires state or territory government nomination and attracts an additional 5 points',
      'C. Does not require a skills assessment',
      'D. Is only available for workers in regional Australia',
    ],
    correctIndex: 1,
    answer: 'B. Requires state or territory government nomination and attracts an additional 5 points',
    explanation: 'The Subclass 190 visa requires a nomination from a state or territory government. In return, applicants receive an additional 5 points in the points test. Both 189 and 190 visas result in permanent residency. The 491 visa (not 190) is specifically for regional Australia and provides 15 additional points.',
    reference: 'Migration Regulations 1994, Schedule 2, Subclass 190',
    tags: ['190', '189', 'state nomination', 'points test'],
  },
  {
    id: 'q015',
    type: 'mcq',
    topic: 'law',
    difficulty: 'hard',
    question: 'Under section 48 of the Migration Act 1958, a non-citizen whose visa was refused or cancelled may not apply for most visas while in Australia. Which of the following can still be applied for under s.48?',
    options: [
      'A. Tourist visa (Visitor subclass 600)',
      'B. Partner visa (Subclass 820)',
      'C. Protection visa (Subclass 866)',
      'D. Student visa (Subclass 500)',
    ],
    correctIndex: 2,
    answer: 'C. Protection visa (Subclass 866)',
    explanation: 'Section 48 prohibits a person in Australia who had a visa refused or cancelled from applying for most visas while onshore. However, certain exempt visa classes can still be applied for, including protection visas (s.48 does not bar protection visa applications, though s.48A bars repeat protection visa applications). Partner and tourist visas are generally barred by s.48.',
    reference: 'Migration Act 1958 ss.48, 48A',
    tags: ['s.48', 'application bar', 'protection visa'],
  },
  {
    id: 'q016',
    type: 'mcq',
    topic: 'visa',
    difficulty: 'medium',
    question: '申请保护签证(Subclass 866)时，"补充保护"类别(Complementary Protection)对应的法律依据是：',
    options: [
      'A. s.36(2)(a)',
      'B. s.36(2)(aa)',
      'C. s.36(3)',
      'D. Schedule 2, Subclass 866.211',
    ],
    correctIndex: 1,
    answer: 'B. s.36(2)(aa)',
    explanation: 's.36(2)(a)是难民公约保护依据（1951难民公约定义）；s.36(2)(aa)是补充保护依据，针对被遣返后将面临重大伤害实质性风险但不完全符合难民公约定义的申请人。理解这两条保护路径的区别是考试重点。',
    reference: 'Migration Act 1958 s.36(2)(aa)',
    tags: ['866', 'protection', 'complementary protection', 's.36'],
  },
  // ─── 新增选择题 (基于Australian Immigration Companion) ─────────────
  {
    id: 'q017',
    type: 'mcq',
    topic: 'ethics',
    difficulty: 'easy',
    question: '根据Code of Conduct 2021，注册移民代理必须在多长时间内回应MARA的询问？',
    options: [
      'A. 7天内',
      'B. 14天内',
      'C. 28天内',
      'D. 合理时间内',
    ],
    correctIndex: 3,
    answer: 'D. 合理时间内',
    explanation: 'Code of Conduct要求代理人在"合理时间内"回应MARA的询问，没有固定天数。这取决于询问的复杂性和紧急程度。代理人应保持专业沟通，及时回应监管机构的合理要求。',
    reference: 'Code of Conduct for Registered Migration Agents 2021',
    tags: ['Code of Conduct', 'MARA', 'communication', 'professional obligations'],
  },
  {
    id: 'q018',
    type: 'mcq',
    topic: 'visa',
    difficulty: 'medium',
    question: 'Subclass 482 (Temporary Skill Shortage)签证持有者在同一雇主处工作满3年后，可以申请：',
    options: [
      'A. 自动转为永久居民',
      'B. Employer Nomination Scheme (Subclass 186)',
      'C. Skilled Independent (Subclass 189)',
      'D. 延长482签证至6年',
    ],
    correctIndex: 1,
    answer: 'B. Employer Nomination Scheme (Subclass 186)',
    explanation: '482签证是临时签证，但持有者在同一雇主处工作满3年后，可以通过雇主担保途径申请186永久签证（TRT stream）。这不是自动的，需要雇主提名并满足其他要求。',
    reference: 'Migration Regulations 1994, Schedule 2, Subclass 186',
    tags: ['482', '186', 'employer sponsored', 'pathway to PR'],
  },
  {
    id: 'q019',
    type: 'mcq',
    topic: 'law',
    difficulty: 'hard',
    question: 'Under s.501 of the Migration Act 1958, which of the following is NOT a primary consideration for character assessment?',
    options: [
      'A. Protection of the Australian community',
      'B. Best interests of minor children in Australia',
      'C. The applicant\'s economic contribution to Australia',
      'D. Whether the conduct giving rise to the concern is part of a pattern',
    ],
    correctIndex: 2,
    answer: "C. The applicant's economic contribution to Australia",
    explanation: 's.501品格测试的主要考虑因素包括：保护澳大利亚社区、未成年子女的最佳利益、行为是否构成模式、行为严重性等。经济贡献不是品格测试的法定考虑因素，尽管在某些情况下可能作为次要因素被提及。',
    reference: 'Migration Act 1958 s.501; Direction No. 90',
    tags: ['s.501', 'character', 'primary considerations', 'Direction 90'],
  },
  {
    id: 'q020',
    type: 'mcq',
    topic: 'visa',
    difficulty: 'medium',
    question: '父母付费移民签证(Subclass 143)与排队父母移民签证(Subclass 103)的主要区别是：',
    options: [
      'A. 143签证处理速度更快但需要支付高额贡献金',
      'B. 103签证允许父母在澳大利亚境内等待',
      'C. 143签证没有家庭平衡测试要求',
      'D. 两种签证的等待时间相同',
    ],
    correctIndex: 0,
    answer: 'A. 143签证处理速度更快但需要支付高额贡献金',
    explanation: '143付费父母签证需要支付约$43,600的贡献金（2024年标准），但处理时间相对较短（约5-6年）。103排队父母签证无需贡献金，但等待时间极长（约30年以上）。两种签证都有家庭平衡测试要求。',
    reference: 'Migration Regulations 1994, Schedule 2, Subclass 103/143',
    tags: ['parent visa', '103', '143', 'contributory', 'processing time'],
  },
  {
    id: 'q021',
    type: 'mcq',
    topic: 'procedure',
    difficulty: 'medium',
    question: 'AAT (Administrative Appeals Tribunal)复议申请的期限通常是：',
    options: [
      'A. 7天',
      'B. 21天',
      'C. 28天',
      'D. 70天',
    ],
    correctIndex: 1,
    answer: 'B. 21天',
    explanation: '对于大多数境内签证决定，AAT复议申请必须在收到决定通知后的21天内提交。某些特定类型的决定可能有不同期限（如保护签证相关决定可能有70天），但21天是标准期限。',
    reference: 'Migration Act 1958 s.347',
    tags: ['AAT', 'review', 'time limit', 'lodgement deadline'],
  },
  {
    id: 'q022',
    type: 'mcq',
    topic: 'visa',
    difficulty: 'hard',
    question: '过桥签证B (Bridging Visa B)的主要用途是：',
    options: [
      'A. 允许在澳大利亚境内工作',
      'B. 允许暂时离境并返回澳大利亚',
      'C. 替代已取消的实质性签证',
      'D. 提供给非法居留者合法身份',
    ],
    correctIndex: 1,
    answer: 'B. 允许暂时离境并返回澳大利亚',
    explanation: 'BVB是唯一允许持有人暂时离境并返回澳大利亚的过桥签证。BVA在离境时即失效。申请BVB需要证明有重要理由需要离境（如家庭紧急情况、商务需要等），并指定返回日期。',
    reference: 'Migration Act 1958 s.75; Migration Regulations 1994',
    tags: ['BVB', 'bridging visa', 'travel', 'departure'],
  },
  {
    id: 'q023',
    type: 'mcq',
    topic: 'law',
    difficulty: 'hard',
    question: '根据s.109，签证可以在什么情况下因信息不符而被取消？',
    options: [
      'A. 任何与申请时提供信息不符的情况',
      'B. 只有故意提供虚假信息时',
      'C. 存在与申请时提供信息不符的情况，且该信息是签证获批的关键因素',
      'D. 只有在发现犯罪记录时',
    ],
    correctIndex: 2,
    answer: 'C. 存在与申请时提供信息不符的情况，且该信息是签证获批的关键因素',
    explanation: 's.109允许在发现申请时提供的信息与事实不符时取消签证，但必须证明该信息是签证获批的关键因素（material to the decision）。不是所有不符都会导致取消，需要考虑严重性、是否故意等因素。',
    reference: 'Migration Act 1958 s.109',
    tags: ['s.109', 'cancellation', 'incorrect information', 'PIC 4020'],
  },
  {
    id: 'q024',
    type: 'mcq',
    topic: 'visa',
    difficulty: 'medium',
    question: '技术移民职业评估(Skills Assessment)通常由哪个机构负责？',
    options: [
      'A. Department of Home Affairs',
      'B. 相关职业评估机构(如ACS、Engineers Australia、VETASSESS等)',
      'C. MARA',
      'D. AAT',
    ],
    correctIndex: 1,
    answer: 'B. 相关职业评估机构(如ACS、Engineers Australia、VETASSESS等)',
    explanation: '技术移民职业评估由各个职业的指定评估机构负责，如ACS（IT类）、Engineers Australia（工程类）、VETASSESS（一般职业）、CPA/CA（会计类）等。移民局只接受这些机构的评估结果。',
    reference: 'Migration Regulations 1994; Skills Assessment requirements',
    tags: ['skills assessment', '189', '190', 'occupation', 'assessing authority'],
  },
  {
    id: 'q025',
    type: 'mcq',
    topic: 'ethics',
    difficulty: 'easy',
    question: '注册移民代理收取的费用必须在什么文件中明确说明？',
    options: [
      'A. 仅在发票中',
      'B. 在代理服务协议(Agreement for Services)中',
      'C. 在签证申请表中',
      'D. 无需书面说明',
    ],
    correctIndex: 1,
    answer: 'B. 在代理服务协议(Agreement for Services)中',
    explanation: 'Code of Conduct要求代理人在代理服务协议中明确说明费用结构、收费方式、预估总费用、退款政策等。这是保护客户知情权和避免费用纠纷的重要措施。',
    reference: 'Code of Conduct for Registered Migration Agents 2021',
    tags: ['Code of Conduct', 'fees', 'agreement', 'disclosure'],
  },
  {
    id: 'q026',
    type: 'mcq',
    topic: 'visa',
    difficulty: 'hard',
    question: 'Schedule 3 criteria通常适用于哪种情况？',
    options: [
      'A. 所有境内签证申请',
      'B. 持有过桥签证期间递交的伴侣签证申请',
      'C. 技术移民签证申请',
      'D. 雇主担保签证申请',
    ],
    correctIndex: 1,
    answer: 'B. 持有过桥签证期间递交的伴侣签证申请',
    explanation: 'Schedule 3适用于在澳大利亚境内持有过桥签证（而非实质性签证）时递交的签证申请，最常见的是820伴侣签证。申请人需要满足特定条件（如与导致过桥签证的情况无关、有令人同情的情况等）才能豁免Schedule 3要求。',
    reference: 'Migration Regulations 1994, Schedule 3',
    tags: ['Schedule 3', '820', 'bridging visa', 'criteria'],
  },
  {
    id: 'q027',
    type: 'mcq',
    topic: 'law',
    difficulty: 'medium',
    question: 'PIC 4020 (Public Interest Criterion 4020)主要涉及：',
    options: [
      'A. 健康和品格要求',
      'B. 提供虚假文件或信息的后果',
      'C. 英语能力要求',
      'D. 经济能力要求',
    ],
    correctIndex: 1,
    answer: 'B. 提供虚假文件或信息的后果',
    explanation: 'PIC 4020规定，如果申请人在签证申请中提供虚假文件或信息，或试图以其他方式欺骗移民局，可能被拒绝签证，并在3年（虚假文件）或10年（虚假身份）内无法获批大多数签证。',
    reference: 'Migration Regulations 1994, Schedule 4, PIC 4020',
    tags: ['PIC 4020', 'fraud', 'bogus documents', 'exclusion period'],
  },
  {
    id: 'q028',
    type: 'mcq',
    topic: 'visa',
    difficulty: 'medium',
    question: 'Subclass 485 (Temporary Graduate)签证的主要目的是：',
    options: [
      'A. 允许毕业生在澳大利亚永久居留',
      'B. 允许国际学生在毕业后在澳大利亚工作一段时间',
      'C. 允许毕业生担保家庭成员移民',
      'D. 允许毕业生申请任何其他签证',
    ],
    correctIndex: 1,
    answer: 'B. 允许国际学生在毕业后在澳大利亚工作一段时间',
    explanation: '485毕业生工作签证允许在澳大利亚完成学业的国际学生在毕业后暂时留在澳大利亚工作。根据学历不同，签证有效期从18个月到6年不等。这是积累澳大利亚工作经验、为技术移民做准备的重要途径。',
    reference: 'Migration Regulations 1994, Schedule 2, Subclass 485',
    tags: ['485', 'graduate visa', 'work rights', 'post-study'],
  },
  {
    id: 'q029',
    type: 'mcq',
    topic: 'review',
    difficulty: 'hard',
    question: 'IAA (Immigration Assessment Authority)与AAT的主要区别是：',
    options: [
      'A. IAA审查所有签证决定',
      'B. IAA是快速审查机制，通常不进行口头听证',
      'C. IAA可以批准签证申请',
      'D. IAA的审查期限比AAT更长',
    ],
    correctIndex: 1,
    answer: 'B. IAA是快速审查机制，通常不进行口头听证',
    explanation: 'IAA是快速审查机制，主要针对保护签证拒绝决定。与AAT不同，IAA通常不进行口头听证，审查基于书面材料，时间更快。IAA只能确认或推翻决定，不能将案件发回重审。',
    reference: 'Migration Act 1958 Division 3A; Migration Regulations 1994',
    tags: ['IAA', 'AAT', 'fast track', 'protection visa', 'review'],
  },
  {
    id: 'q030',
    type: 'mcq',
    topic: 'visa',
    difficulty: 'medium',
    question: '担保人(Sponsor)在伴侣签证中的义务包括：',
    options: [
      'A. 仅为申请人提供住宿',
      'B. 提供经济支持承诺，并在某些情况下承担偿还政府福利的责任',
      'C. 为申请人找到工作',
      'D. 担保义务在签证获批后立即终止',
    ],
    correctIndex: 1,
    answer: 'B. 提供经济支持承诺，并在某些情况下承担偿还政府福利的责任',
    explanation: '伴侣签证担保人需要签署担保承诺，保证在特定期间内（通常是2年）为申请人提供经济支持。如果申请人在此期间领取了某些政府福利，担保人可能需要向政府偿还。',
    reference: 'Migration Regulations 1994; Assurance of Support requirements',
    tags: ['sponsor', 'partner visa', 'assurance of support', 'obligations'],
  },
  // ─── 简答题 SHORT ───────────────────────────────────────────────
  {
    id: 'q101',
    type: 'short',
    topic: 'ethics',
    difficulty: 'medium',
    question: 'A client asks you to help them submit a visa application. You discover that some of the supporting documents they have provided appear to be fraudulent. What are your obligations under the Code of Conduct?',
    answer: 'Your obligations include: (1) You must NOT submit fraudulent documents — this would breach your obligation of honesty and integrity under the Code of Conduct and could constitute a criminal offence. (2) You must advise the client that you cannot assist them in submitting false documents, clearly explaining the legal consequences. (3) You should consider whether to withdraw from representing the client if they insist on proceeding with fraudulent documents. (4) You are not required to report the client to authorities (no mandatory reporting unless specific circumstances), but you cannot be complicit. (5) Document your decision and communication with the client.',
    explanation: '移民代理的诚信义务是行为准则的核心。提交虚假文件不仅违反行为准则，还可能构成犯罪。代理人必须拒绝配合并考虑撤出代理关系。',
    reference: 'Code of Conduct for Registered Migration Agents 2021; Migration Act 1958',
    tags: ['Code of Conduct', 'fraud', 'honesty', 'withdrawal'],
  },
  {
    id: 'q102',
    type: 'short',
    topic: 'visa',
    difficulty: 'medium',
    question: '请解释伴侣签证申请中的"家庭暴力条款"，包括：(a)条款的目的；(b)申请人需要提供的证明；(c)该条款如何改变通常的申请要求。',
    answer: '(a) 目的：家庭暴力条款旨在保护遭受家庭暴力的签证申请人，使其能够在不需要与施暴担保人维持关系的情况下仍可继续推进伴侣签证申请，防止受害者因担心失去签证而无法离开危险关系。\n\n(b) 所需证明：申请人须提供以下之一：①独立专家报告(独立专家需是认可机构人员)；②法定声明+辅助证据；③法院保护令；④定罪证明；⑤相关组织证明（如庇护所、警察等）。\n\n(c) 通常要求的改变：正常情况下820/309申请人须在转为永久801/100签证前保持关系持续。家庭暴力条款允许申请人在证明遭受家庭暴力后，即使关系已终止也可获批永久签证，无需等待两年。',
    explanation: '家庭暴力条款体现了移民法中保护弱势群体的政策导向，是Capstone口试中常见的讨论主题。',
    reference: 'Migration Act 1958 s.180A; Migration Regulations 1994 Division 1.5',
    tags: ['820', 'family violence', 'partner visa', 'protection'],
  },
  {
    id: 'q103',
    type: 'short',
    topic: 'law',
    difficulty: 'hard',
    question: 'Explain the principle of "natural justice" (procedural fairness) in the context of migration decision-making. What are the key requirements, and what happens if natural justice is not afforded?',
    answer: 'Natural justice (procedural fairness) in migration law requires that: (1) The right to be heard — applicants must be given an opportunity to know of and respond to adverse information before a decision is made against them (codified in s.57 for visa applications and ss.119-120 for cancellations). (2) Rule against bias — decision-makers must not have a personal interest in the outcome or pre-determined the decision. (3) Adequate notice — sufficient time and information must be provided for the applicant to respond meaningfully.\n\nConsequences of failing to afford natural justice: A decision made in breach of natural justice constitutes a jurisdictional error, which means the Federal Court or Federal Circuit Court can review and quash the decision under s.476. The matter would typically be remitted back to the Department for reconsideration.',
    explanation: '自然公正是澳大利亚行政法的基石，在移民法中有特定的法条实施。违反自然公正是最常见的司法审查理由之一。',
    reference: 'Migration Act 1958 ss.57, 119-120, 476',
    tags: ['natural justice', 'procedural fairness', 's.57', 'judicial review'],
  },
  // ─── 新增简答题 ───────────────────────────────────────────────
  {
    id: 'q104',
    type: 'short',
    topic: 'visa',
    difficulty: 'medium',
    question: '请解释s.48条款(Bar on making further visa applications)的适用条件和例外情况。',
    answer: 's.48条款适用条件：申请人在澳大利亚境内，且此前有签证申请被拒绝或签证被取消（不包括过桥签证）。\n\n主要影响：受s.48限制的人不能在境内申请大多数实质性签证，必须离境后申请。\n\n例外情况（仍可申请的签证）：\n1. 保护签证(Subclass 866) - s.48不限制首次保护签证申请\n2. 某些医疗治疗签证\n3. 某些临时签证（如特定情况下的过桥签证）\n4. 部长干预后指定的签证类别\n\n注意：s.48A限制重复保护签证申请。',
    explanation: 's.48是移民法中重要的申请限制条款，理解其适用范围和例外对实务操作至关重要。',
    reference: 'Migration Act 1958 s.48, 48A',
    tags: ['s.48', 'application bar', 'onshore', 'protection visa', 'exceptions'],
  },
  {
    id: 'q105',
    type: 'short',
    topic: 'ethics',
    difficulty: 'medium',
    question: '注册移民代理在什么情况下应该考虑撤出代理关系(Withdrawal from representation)？撤出时应遵循什么程序？',
    answer: '应考虑撤出代理的情况：\n1. 客户要求代理人从事不道德或非法行为（如提交虚假文件）\n2. 客户拒绝遵循代理人的合理建议\n3. 客户未能支付约定的费用且未达成付款安排\n4. 存在无法解决的利益冲突\n5. 客户对代理人进行威胁或虐待\n\n撤出程序：\n1. 提前书面通知客户（通常至少14天）\n2. 说明撤出的原因\n3. 告知客户其权利和后续选择\n4. 归还客户的原始文件\n5. 向MARA报告（如涉及严重违规）\n6. 确保客户的申请状态不会因撤出而受到不当影响',
    explanation: '撤出代理是代理人的权利，但必须遵循适当程序以保护客户利益并符合职业规范。',
    reference: 'Code of Conduct for Registered Migration Agents 2021',
    tags: ['Code of Conduct', 'withdrawal', 'termination', 'professional obligations'],
  },
  {
    id: 'q106',
    type: 'short',
    topic: 'visa',
    difficulty: 'hard',
    question: '解释雇主担保签证中的Labour Market Testing (LMT)要求，包括适用情况、豁免条件和常见违规风险。',
    answer: 'Labour Market Testing (LMT)要求：\n\n适用情况：大多数482 (TSS)签证提名需要证明雇主已在澳大利亚劳动力市场测试过，无法找到合适的本地工人。\n\n具体要求：\n1. 在指定平台（如JobActive）发布招聘广告\n2. 广告需持续至少4周\n3. 广告需在提名申请前4个月内发布\n4. 需证明已认真评估本地申请人\n\n豁免情况：\n1. 特定职业（如某些高级管理职位）\n2. 国际贸易义务相关的提名\n3. 特定国家/地区的公民（基于国际贸易协定）\n\n违规风险：\n1. 虚假广告或"走过场"招聘\n2. 未保留招聘证据\n3. 拒绝合格的本地申请人而无合理理由\n4. 提供虚假LMT信息可能导致签证拒绝和PIC 4020限制',
    explanation: 'LMT是雇主担保签证的核心要求，旨在保护本地就业市场。代理人需要指导雇主合规操作。',
    reference: 'Migration Regulations 1994; Department of Home Affairs LMT guidelines',
    tags: ['482', 'LMT', 'labour market testing', 'employer sponsored', 'nomination'],
  },
  {
    id: 'q107',
    type: 'short',
    topic: 'law',
    difficulty: 'medium',
    question: '什么是"部长干预"(Ministerial Intervention)？在什么情况下可以考虑申请部长干预？',
    answer: '部长干预是指移民部长根据Migration Act s.351, 417, 454等条款，亲自干预并推翻移民局或AAT的决定的权力。\n\n适用情况（通常需要满足以下条件之一）：\n1. 案件具有强烈的同情因素（如严重健康问题、家庭分离）\n2. 案件涉及澳大利亚公民或永久居民的重要利益\n3. 案件具有政策意义或先例价值\n4. 其他特殊情况使得正常程序无法达成公正结果\n\n限制：\n1. 部长没有义务干预任何案件\n2. 大多数案件不符合干预标准\n3. 品格问题导致的取消决定通常不符合干预条件\n\n程序：\n1. 必须先穷尽其他审查途径（如AAT复议）\n2. 向Department of Home Affairs提交部长干预请求\n3. 提供详细的同情因素证据',
    explanation: '部长干预是最后的救济手段，成功率很低，但在特定情况下可能是唯一选择。',
    reference: 'Migration Act 1958 ss.351, 417, 454',
    tags: ['ministerial intervention', 'compassionate circumstances', 'final remedy'],
  },
  {
    id: 'q108',
    type: 'short',
    topic: 'visa',
    difficulty: 'hard',
    question: '解释保护签证申请中的"安全第三国"(Safe Third Country)概念及其对申请的影响。',
    answer: '"安全第三国"概念：\n\n定义：如果申请人曾在另一个国家获得有效保护（如难民身份），或有机会在该国寻求保护但未能这样做，该国可能被视为"安全第三国"。\n\n法律影响：\n1. 如果申请人已在安全第三国获得保护，澳大利亚可能拒绝其保护签证申请\n2. 这基于难民公约的"首次庇护国"原则\n3. 澳大利亚政府会评估第三国是否真正提供有效保护\n\n例外情况：\n1. 第三国不再安全（如政治局势变化）\n2. 申请人在第三国面临特定风险\n3. 第三国拒绝提供保护\n\n实务考虑：\n代理人需要详细了解申请人的旅行史和在途经国家的经历，评估安全第三国问题是否适用。',
    explanation: '安全第三国是保护签证申请中的复杂问题，需要仔细评估申请人的具体情况。',
    reference: 'Migration Act 1958; Refugee Convention; Direction No. 75',
    tags: ['866', 'protection visa', 'safe third country', 'refugee', 'excised offshore'],
  },
  // ─── 案例分析 CASE ───────────────────────────────────────────────
  {
    id: 'q201',
    type: 'case',
    topic: 'visa',
    difficulty: 'hard',
    question: `**CASE SCENARIO**

Wei is a 28-year-old Chinese national who is currently in Australia on a Student visa (Subclass 500). He has been studying at a registered ELICOS provider for the past 8 months. Recently, he has been working 55 hours per fortnight at a local restaurant to support himself financially.

Wei comes to you as his registered migration agent seeking advice. He tells you he has just received a Notice of Intention to Consider Cancellation (NOICC) from the Department of Home Affairs in relation to his student visa.

**Questions:**
1. What visa condition has Wei likely breached and what is the legal basis for the proposed cancellation?
2. What options does Wei have in responding to the NOICC?
3. What are the potential consequences if his visa is cancelled?
4. As his migration agent, what are your professional obligations in handling this matter?`,
    answer: `**1. Breach and Legal Basis**
Wei has likely breached Condition 8104 of Schedule 8 to the Migration Regulations 1994, which limits Student visa holders to working no more than 48 hours per fortnight once their course has commenced. Wei has been working 55 hours per fortnight — 7 hours in excess of the permitted limit.

The proposed cancellation is based on section 116(1)(b) of the Migration Act 1958, which allows the Minister to cancel a visa if the holder has not complied with a condition of the visa.

**2. Options in Responding to the NOICC**
The NOICC gives Wei an opportunity to respond (natural justice per ss.119-120). His options include:
- Submit written representations explaining circumstances (financial hardship, lack of awareness of limit)
- Provide evidence of any mitigating factors
- Challenge whether the hours were actually worked as alleged
- Seek advice on requesting a hearing if applicable
- Consider voluntarily reducing work hours immediately

**3. Potential Consequences if Visa Cancelled**
- Wei becomes an unlawful non-citizen (s.14 MA)
- He must depart or be detained under s.196
- He will have a s.48 bar preventing most onshore visa applications
- He may face a re-entry ban
- He loses the right to continue his studies
- He may be able to apply for a Bridging Visa E pending arrangements to depart, or potentially lodge a review application with the AAT

**4. Professional Obligations as Migration Agent**
- Advise Wei honestly about his situation and prospects
- Assist him in preparing a thorough response to the NOICC within the required timeframe
- Do NOT advise Wei to provide false information in the response
- Ensure Wei understands the consequences of various outcomes
- Consider his best interests — if cancellation is likely, advise on voluntary departure as a better option for future visa prospects
- Document all advice and instructions in accordance with the Code of Conduct
- Maintain client confidentiality`,
    explanation: '这道案例题涵盖了学生签证条件违规、NOICC程序、自然公正、后果分析和代理人职业责任等多个核心考点，是Capstone考试中典型的案例分析题型。',
    reference: 'Migration Act 1958 ss.116, 119-120, 196, 198, 48; Migration Regulations 1994 Schedule 8 Condition 8104',
    tags: ['500', '8104', 'NOICC', 'cancellation', 'professional obligations'],
  },
  {
    id: 'q202',
    type: 'case',
    topic: 'ethics',
    difficulty: 'hard',
    question: `**CASE SCENARIO**

Lin is a registered migration agent. Her client, Mr. Chen, is applying for an Employer Nomination Scheme visa (Subclass 186) through his employer. During the process, Lin discovers that:
- The employer has been offering to pay Mr. Chen $58,000 per year, but has asked Lin to prepare documentation showing $75,000 per year to satisfy visa requirements
- Mr. Chen is aware of this arrangement and has agreed to it
- The employer says this is "common practice" and offers Lin a $2,000 "facilitation fee"

**Questions:**
1. Identify the ethical and legal issues in this scenario.
2. What should Lin do?
3. What could be the consequences for Lin, Mr. Chen, and the employer if this arrangement proceeds?`,
    answer: `**1. Ethical and Legal Issues**

(a) Document fraud: Preparing documents showing a higher salary than actually agreed constitutes document fraud. This would amount to providing false and misleading information to the Department of Home Affairs.

(b) Breach of Code of Conduct: Lin would be in breach of her obligations of honesty and integrity under the Code of Conduct for Registered Migration Agents.

(c) Criminal offences: Submitting false documents is a criminal offence under s.234 of the Migration Act 1958 and potentially under the Criminal Code Act 1995. Both Lin and the employer could face criminal liability.

(d) Employer obligations: The employer has a legal obligation to pay the TSMIT ($70,000/year) and market salary. Falsely documenting a higher salary to satisfy the visa requirement while actually paying less is both fraud and a breach of sponsor obligations.

(e) "Facilitation fee": Accepting the $2,000 payment for facilitating this fraudulent arrangement would constitute accepting a corrupt benefit — a serious criminal matter.

**2. What Lin Should Do**
- Refuse to prepare fraudulent documentation — this is non-negotiable
- Clearly explain to the employer and Mr. Chen why she cannot proceed with this arrangement, including the legal consequences
- Advise that the actual proposed salary of $58,000 does not meet the TSMIT requirement and therefore the 186 visa application cannot proceed on this basis
- Explore legitimate alternatives (e.g., employer genuinely increasing the salary to meet TSMIT)
- Consider withdrawing from the matter if the parties insist on proceeding with fraud
- Document all interactions carefully

**3. Consequences if the Arrangement Proceeds**
- For Lin: Criminal prosecution for migration fraud, cancellation of MARA registration, civil penalties, reputational damage
- For Mr. Chen: Visa may be refused or later cancelled if fraud discovered; criminal charges; deportation; re-entry ban
- For the employer: Loss of sponsorship approval, civil and criminal penalties, prohibition from future sponsorship, potential prosecution`,
    explanation: '这个案例测试代理人在面对客户/雇主施压要求配合欺诈行为时的正确应对，是职业道德的核心考点。',
    reference: 'Code of Conduct for Registered Migration Agents 2021; Migration Act 1958 s.234',
    tags: ['Code of Conduct', 'fraud', 'document fraud', '186', 'TSMIT'],
  },
  {
    id: 'q203',
    type: 'case',
    topic: 'review',
    difficulty: 'hard',
    question: `**CASE SCENARIO**

Maria, a 35-year-old Filipino national, arrived in Australia 10 years ago on a working holiday visa. Over the years she has lived continuously in Australia on various bridging visas while her visa applications were being processed. She was in a relationship with an Australian citizen, David, but they separated 6 months ago. 

Maria was recently refused a Partner visa (Subclass 820) because the decision-maker determined the relationship was no longer genuine at the time of decision. Maria claims the relationship was genuine but ended due to genuine difficulties unrelated to the visa. She did not receive proper notice of the adverse information before the decision was made.

**Questions:**
1. Does Maria have any avenue for review of this decision?
2. What argument might she raise about the procedure followed?
3. What is the likely practical outcome, and what are Maria's options going forward?`,
    answer: `**1. Avenues for Review**
Yes, Maria has the following review options:

(a) AAT (Administrative Appeals Tribunal) — Migration and Refugee Division: She can apply for merits review of the delegate's refusal decision. The application must be lodged within 70 days of the decision notice being given (for onshore decisions). The AAT will conduct its own assessment of whether the relationship was genuine.

(b) Judicial Review — Federal Circuit Court: If there has been a jurisdictional error (such as breach of natural justice), she could seek judicial review under s.476.

**2. Natural Justice Argument**
The failure to give proper notice of adverse information before the decision was made may constitute a breach of s.57 of the Migration Act 1958. Section 57 requires the decision-maker to give an applicant particulars of any information that the decision-maker considers would be the reason or part of the reason for refusing the visa, and invite the applicant to comment on it.

If the decision-maker made findings about the genuineness of the relationship based on information Maria was not given a chance to respond to, this may be a jurisdictional error, potentially making the decision invalid.

**3. Practical Outcomes and Options**

(a) Before the AAT: Maria can present fresh evidence and oral evidence at a hearing. The AAT will make its own merits assessment. If the relationship has ended, this complicates matters but does not automatically defeat the application — the relationship must have been genuine at the time of application.

(b) If AAT is successful: Decision is set aside and Maria may receive the visa.

(c) If AAT is unsuccessful: Consider further judicial review if jurisdictional error grounds exist.

(d) Alternative visa options: Maria may need to consider other visa pathways if partner visa is not viable — her 10-year residence and circumstances may be relevant to other applications.

(e) Departure risk: Maria is currently on a Bridging Visa A (pending the application). If AAT application is lodged in time, she may be able to obtain a Bridging Visa to remain while the AAT review proceeds. She should NOT depart without first obtaining a BVB.`,
    explanation: '这道案例题综合测试了伴侣签证、自然公正要求、AAT复议程序、司法审查基础和实务操作建议等多个重要知识点。',
    reference: 'Migration Act 1958 ss.57, 348, 476; Migration Regulations 1994 Schedule 2 Subclass 820',
    tags: ['820', 'AAT', 'natural justice', 's.57', 'review', 'partner visa'],
  },
  // ─── 新增案例分析题 ───────────────────────────────────────────────
  {
    id: 'q204',
    type: 'case',
    topic: 'visa',
    difficulty: 'hard',
    question: `**CASE SCENARIO**

Zhang Wei is a 32-year-old Chinese national who arrived in Australia on a Tourist visa (Subclass 600) six months ago. While in Australia, he met an Australian citizen, Emma, and they started a relationship. They decided to live together and Zhang Wei applied for a Partner visa (Subclass 820) two months ago.

Zhang Wei's Tourist visa expired one month ago. He is now on a Bridging Visa A (BVA) while his 820 application is being processed. Emma has been supporting him financially as he is not working.

Zhang Wei recently received a letter from the Department stating that they are considering refusing his 820 application because he may not meet Schedule 3 criteria.

**Questions:**
1. What is Schedule 3 and why might it apply to Zhang Wei's situation?
2. What are the specific Schedule 3 criteria that Zhang Wei needs to address?
3. What arguments could be made to support a waiver of Schedule 3 requirements?
4. What are Zhang Wei's options if the 820 application is refused?`,
    answer: `**1. Schedule 3 Overview and Applicability**

Schedule 3 of the Migration Regulations applies to visa applications made by applicants who hold a Bridging Visa (or certain other temporary visas) at the time of application, rather than a substantive visa. It requires that the applicant must have held a substantive visa at the time of application OR meet specific waiver criteria.

Zhang Wei's situation: He applied for the 820 visa while holding a BVA (after his Tourist visa expired), so Schedule 3 applies.

**2. Specific Schedule 3 Criteria**

Schedule 3 requires that the applicant:
- Held a substantive visa when they became the holder of a Bridging Visa (satisfied - he held Tourist visa)
- Has not held a Bridging Visa for more than a specified period before applying (varies by visa)
- Has complied with conditions of previous visas

The key issue is whether Zhang Wei can meet the "compelling circumstances" test for waiver.

**3. Arguments for Schedule 3 Waiver**

Compelling circumstances may include:
- The relationship with Emma is genuine and continuing
- They have established a shared life together in Australia
- Separation would cause significant hardship to both parties
- Emma is an Australian citizen with rights to have her partner in Australia
- Zhang Wei entered Australia lawfully and has complied with visa conditions
- The application was made reasonably promptly after the relationship developed

**4. Options if 820 Refused**

(a) AAT Review: Apply for merits review within 21 days
(b) New Partner Visa Application: If circumstances change (e.g., marry, have child)
(c) Departure and Offshore Application: Leave Australia and apply for Partner visa (309) from China
(d) Other Visa Options: Explore if any other visa pathways are available
(e) Ministerial Intervention: If there are exceptional compassionate circumstances`,
    explanation: 'Schedule 3是伴侣签证申请中的常见复杂问题，特别是针对境内过桥签证持有者。理解其要求和豁免条件对实务操作至关重要。',
    reference: 'Migration Regulations 1994, Schedule 3; Migration Act 1958 s.48',
    tags: ['820', 'Schedule 3', 'partner visa', 'bridging visa', 'compelling circumstances'],
  },
  {
    id: 'q205',
    type: 'case',
    topic: 'law',
    difficulty: 'hard',
    question: `**CASE SCENARIO**

Ahmed is a 28-year-old Syrian national who arrived in Australia by boat in 2012. He was granted a Temporary Protection Visa (TPV) in 2015. Ahmed has been living and working in Australia for the past 9 years. He has no criminal record and has been compliant with all visa conditions.

Recently, Ahmed received a Notice of Intention to Consider Cancellation (NOICC) under section 501 of the Migration Act. The notice states that ASIO has provided an adverse security assessment regarding Ahmed, alleging he may have had indirect contact with individuals associated with a proscribed terrorist organization in Syria before he fled the country.

Ahmed denies any involvement with terrorist organizations and claims he fled Syria to escape persecution. He has established a life in Australia, has Australian citizen friends, and his parents (also on TPVs) are in Australia.

**Questions:**
1. What is the legal basis for the proposed cancellation and what process must be followed?
2. What are the key issues in assessing Ahmed's case under s.501?
3. What are Ahmed's rights and options in responding to the NOICC?
4. What are the potential consequences if his visa is cancelled?`,
    answer: `**1. Legal Basis and Process**

Section 501(3) allows the Minister (or delegate) to cancel a visa if the Minister reasonably suspects the person does not pass the character test and the person does not satisfy the Minister that they pass the character test.

The character test includes:
- Having a substantial criminal record
- Being associated with criminal or terrorist organizations
- Being a risk to national security
- Being a risk to the Australian community

Process:
- NOICC must be issued (ss.119-120 do NOT apply to s.501 cancellations)
- Opportunity to respond within specified timeframe
- Minister/Delegate considers response before making decision
- If cancelled, review options are limited (personal Minister decisions under s.501(3) are NOT reviewable by AAT)

**2. Key Assessment Issues**

Primary Considerations (per Direction No. 90):
- Protection of the Australian community
- Best interests of minor children in Australia (not applicable here)
- Expectations of the Australian community

Specific issues in Ahmed's case:
- Strength of ASIO's adverse security assessment
- Whether Ahmed had actual knowledge of associations
- Time elapsed since alleged conduct
- Ahmed's conduct in Australia (9 years compliant)
- Family ties in Australia
- Risk if returned to Syria

**3. Ahmed's Rights and Options**

(a) Respond to NOICC:
- Provide detailed written submissions
- Challenge the factual basis of ASIO's assessment
- Provide character references
- Demonstrate his integration into Australian society
- Explain circumstances of any indirect contact

(b) Legal Representation:
- Engage migration agent and potentially security-cleared lawyer
- May be able to access ASIO assessment through special procedures

(c) Judicial Review:
- If cancelled, may seek judicial review on jurisdictional error grounds
- Limited scope - cannot review merits of security assessment

**4. Consequences of Cancellation**

- Removal from Australia to Syria (or third country if available)
- Separation from family members in Australia
- Potential danger if returned to Syria
- No AAT review available for personal Minister decisions under s.501(3)
- Limited judicial review options
- Possible detention pending removal under s.196`,
    explanation: 's.501品格测试取消是移民法中最严厉的措施之一，特别是涉及安全评估时。理解程序限制和应对策略对代理人至关重要。',
    reference: 'Migration Act 1958 s.501; Direction No. 90; ASIO Act 1979',
    tags: ['s.501', 'character', 'security assessment', 'TPV', 'cancellation', 'ASIO'],
  },
  {
    id: 'q206',
    type: 'case',
    topic: 'ethics',
    difficulty: 'medium',
    question: `**CASE SCENARIO**

Sarah is a registered migration agent with a small practice. She has been approached by a new client, Mr. Johnson, who wants to apply for a Business Innovation and Investment (Subclass 188) visa. Mr. Johnson mentions that his friend recommended Sarah and that he has already prepared most of the application documents himself.

During the initial consultation, Sarah notices several issues:
1. Mr. Johnson's business documents appear to overstate his business turnover
2. He has provided a business plan that seems to be copied from an online template with minimal customization
3. He is pressuring Sarah to lodge the application quickly as he wants to bring his family to Australia before the school term starts
4. He offers to pay Sarah a "success fee" of $10,000 if the visa is granted, in addition to her normal fees

**Questions:**
1. Identify the ethical and professional issues in this scenario.
2. What should Sarah do in response to each issue?
3. What should be included in the written agreement with Mr. Johnson?
4. If Mr. Johnson insists on proceeding with the questionable documents, what are Sarah's options?`,
    answer: `**1. Ethical and Professional Issues**

(a) Potentially false/misleading documents:
- Overstated business turnover may constitute fraud
- Copied business plan lacks genuineness

(b) Unethical fee arrangement:
- "Success fees" are prohibited under MARA regulations
- Fees must be for services rendered, not outcomes

(c) Time pressure:
- Rushing applications increases risk of errors
- Client's timeline should not compromise professional standards

(d) Pre-prepared documents:
- Agent must verify documents before submission
- Cannot submit documents known to be false

**2. Sarah's Response to Each Issue**

(a) Document concerns:
- Inform Mr. Johnson that documents must be accurate and genuine
- Request original/source documents to verify claims
- Explain that false documents could result in refusal and PIC 4020 ban

(b) Fee arrangement:
- Clearly refuse the success fee proposal
- Explain that MARA prohibits outcome-based fees
- Provide standard fee schedule for professional services

(c) Timeline pressure:
- Explain that thorough preparation is essential
- Quality applications take time
- Rushing increases risk of refusal

(d) Business plan:
- Require a proper, customized business plan
- May recommend business consultant if needed

**3. Written Agreement Requirements**

Must include:
- Clear description of services to be provided
- Fee structure (hourly or fixed) with no success component
- Payment terms and schedule
- Client's responsibility for document accuracy
- Agent's right to withdraw if client provides false information
- Complaints procedure
- Termination clause

**4. Options if Client Insists on False Documents**

(a) Refuse to act:
- Sarah cannot submit documents she knows to be false
- Must withdraw from representation

(b) Document the decision:
- Keep records of advice given and client's response
- Written confirmation that she cannot proceed

(c) Return documents and fees:
- Return any fees for unperformed services
- Return client's documents

(d) Consider MARA reporting:
- If client has committed or intends to commit serious fraud
- Consult MARA guidelines on reporting obligations`,
    explanation: '这个案例测试代理人在面对客户压力和不道德提议时的职业操守，涉及费用合规、文件真实性、撤出代理等多个重要方面。',
    reference: 'Code of Conduct for Registered Migration Agents 2021; Migration Act 1958 s.234',
    tags: ['Code of Conduct', 'ethics', 'fees', 'fraud', 'withdrawal', '188'],
  },
  {
    id: 'q207',
    type: 'case',
    topic: 'visa',
    difficulty: 'hard',
    question: `**CASE SCENARIO**

Dr. Lee is a 45-year-old medical specialist from Malaysia. She has been offered a position at a regional hospital in Australia under the Subclass 186 (Employer Nomination Scheme) visa. Her employer is a regional health service that has been approved as a Standard Business Sponsor.

Key facts:
- The position is for a Specialist Physician with ANZSCO code 253311
- The offered salary is AUD $180,000 per year
- Dr. Lee has 15 years of experience and her qualifications have been assessed as comparable to Australian standards by the relevant medical board
- She has a dependent spouse and two children (ages 8 and 12)
- The employer has conducted Labour Market Testing as required

However, there are some complications:
1. Dr. Lee had a minor criminal conviction in Malaysia 10 years ago for a traffic offence (driving without a valid license)
2. Her eldest child has been diagnosed with autism and may have significant healthcare needs

**Questions:**
1. What are the main visa requirements for the Subclass 186 visa that need to be assessed?
2. How should the criminal conviction be addressed?
3. What are the implications of the child's health condition for the visa application?
4. What advice should be given to Dr. Lee and her employer about the application process?`,
    answer: `**1. Main Subclass 186 Visa Requirements**

(a) Nomination Requirements (Employer):
- Position must be genuine and full-time
- Position must be on the relevant occupation list
- Market salary rate must be met (TSMIT: $70,000+ or market rate, whichever is higher)
- Labour Market Testing completed (if required)
- Business must be lawfully operating

(b) Visa Requirements (Applicant):
- Skills assessment (if required for occupation)
- At least 3 years of relevant work experience
- Competent English (IELTS 6.0 or equivalent)
- Under 45 years of age (Dr. Lee is 45 - may need exemption)
- Meet health and character requirements

**2. Addressing the Criminal Conviction**

The 10-year-old traffic offence:
- Minor traffic offences are generally not a character concern
- Must be disclosed in the application
- Provide police clearance certificates from all countries of residence
- Prepare explanation: isolated incident, long time ago, no pattern of offending
- Unlikely to prevent visa grant unless there are other concerns

**3. Child's Health Condition Implications**

Health requirement (PIC 4007):
- All family members must meet health requirements
- Autism diagnosis may trigger health assessment
- Key considerations:
  * Cost to Australian community (healthcare, education support)
  * Whether costs are "significant" (threshold is approximately $51,000 over lifetime)
  * Whether health waiver is available (186 visa has health waiver provision)

Strategy:
- Prepare detailed submission on management plan
- Demonstrate family's ability to cover costs
- Highlight Dr. Lee's contribution to regional healthcare
- Apply for health waiver if required

**4. Advice for Dr. Lee and Employer**

(a) Age exemption:
- Dr. Lee is 45 - may need to apply for age exemption
- Exemptions available for certain occupations/regional positions
- Regional medical positions often qualify for exemptions

(b) Application strategy:
- Ensure all documents are thoroughly prepared
- Address character and health issues proactively
- Highlight regional placement benefits

(c) Timeline:
- 186 processing can take 6-12 months
- Consider temporary options if needed (e.g., 482 visa)

(d) Family preparation:
- Research schools and autism support services in the regional area
- Connect with local support networks before arrival`,
    explanation: '这个案例综合测试了雇主担保签证的多个复杂方面：年龄限制、品格要求、健康要求和家庭成员评估，是Capstone考试中常见的综合案例题型。',
    reference: 'Migration Regulations 1994, Schedule 2, Subclass 186; Direction No. 90; PIC 4007',
    tags: ['186', 'employer nominated', 'health waiver', 'character', 'age exemption', 'regional'],
  },
  {
    id: 'q208',
    type: 'case',
    topic: 'review',
    difficulty: 'hard',
    question: `**CASE SCENARIO**

Priya is a 30-year-old Indian national who applied for a Skilled Independent visa (Subclass 189) two years ago. Her application was refused because the Department determined that her skills assessment from VETASSESS was not valid for the nominated occupation (Marketing Specialist).

Priya believes the refusal was incorrect because:
1. She had a positive skills assessment at the time of invitation
2. The assessment was still within its validity period
3. She has been working in a marketing role for 4 years
4. The Department's refusal letter did not clearly explain why the assessment was considered invalid

Priya is currently in Australia on a Bridging Visa A. She has 60 days remaining to seek review of the decision.

**Questions:**
1. What review options does Priya have?
2. What are the likely grounds for challenging the refusal?
3. What evidence should be gathered to support the review application?
4. What are the risks and potential outcomes of pursuing review?`,
    answer: `**1. Review Options**

(a) AAT (Administrative Appeals Tribunal) - Recommended:
- Merits review of the delegate's decision
- Must apply within 70 days of decision (Priya has 60 days remaining)
- AAT will conduct fresh assessment of the evidence
- Can consider new information

(b) Judicial Review - Federal Circuit Court:
- Only if there is a jurisdictional error
- More expensive and complex
- Usually only if AAT review is not available or unsuccessful

**2. Likely Grounds for Challenging the Refusal**

(a) Error regarding skills assessment validity:
- If assessment was positive and valid at time of invitation, refusal may be incorrect
- Skills assessments typically valid for 3 years

(b) Natural justice/procedural fairness:
- If Priya was not given adequate opportunity to address concerns about the assessment
- If refusal reasons were unclear or inadequate

(c) Failure to properly consider evidence:
- If Department did not properly assess the VETASSESS outcome
- If relevant factors were overlooked

**3. Evidence to Gather**

(a) Skills assessment documentation:
- Original VETASSESS outcome letter
- Assessment validity dates
- Correspondence with VETASSESS

(b) Employment evidence:
- Employment contracts
- Reference letters
- Payslips
- Job descriptions showing marketing duties

(c) Application timeline:
- Invitation letter
- Date of skills assessment
- Date of visa application
- Evidence assessment was valid at relevant times

(d) Expert opinion:
- Letter from VETASSESS confirming assessment validity
- ANZSCO occupation description matching Priya's role

**4. Risks and Potential Outcomes**

Risks:
- AAT application fee ($3,000+)
- Legal/agent costs
- Time (AAT review can take 12-18 months)
- Possibility of unfavorable outcome

Potential Outcomes:

(a) Successful:
- AAT sets aside the refusal decision
- Matter remitted to Department for reconsideration
- Visa may be granted

(b) Unsuccessful:
- AAT affirms the refusal
- Priya may seek judicial review (if grounds exist)
- Or consider other visa options

(c) Bridging Visa implications:
- Priya can remain on BVA while AAT review pending
- If review unsuccessful, BVA may cease
- Need to consider departure or other visa options

Strategic Considerations:
- Strong case if skills assessment was genuinely valid
- Need to act quickly (only 60 days left)
- Consider whether to engage lawyer or agent for AAT proceedings`,
    explanation: '这个案例测试了技术移民签证拒绝后的复议程序，涉及AAT审查、证据准备、时间限制和策略考虑，是实务中常见的情况。',
    reference: 'Migration Act 1958 s.348; Migration Regulations 1994, Schedule 2, Subclass 189',
    tags: ['189', 'AAT', 'review', 'skills assessment', 'refusal', 'merits review'],
  },
  {
    id: 'q209',
    type: 'case',
    topic: 'visa',
    difficulty: 'medium',
    question: `**CASE SCENARIO**

Tom is an Australian citizen who wants to sponsor his elderly parents, Mary and John (both aged 68), for a Parent visa. Mary and John are currently living in the UK and are both retired. They have three children:
- Tom (Australian citizen, living in Sydney)
- Susan (UK citizen, living in London)
- David (UK citizen, living in Manchester)

Mary and John have approximately £200,000 in savings and receive UK state pensions. They have no major health issues but John has controlled hypertension.

They are considering two options:
1. Contributory Parent visa (Subclass 143)
2. Parent visa (Subclass 103)

**Questions:**
1. Assess whether Mary and John meet the Balance of Family Test requirements.
2. What are the key differences between the Subclass 143 and Subclass 103 visas?
3. What are the Assurance of Support requirements for each visa option?
4. What advice would you give Tom and his parents about which visa to choose?`,
    answer: `**1. Balance of Family Test Assessment**

The Balance of Family Test requires that at least half of the parent's children live in Australia, or more children live in Australia than in any other single country.

Mary and John's children:
- Tom: Australian citizen (in Australia)
- Susan: UK citizen (in UK)
- David: UK citizen (in UK)

Assessment:
- 1 child in Australia
- 2 children in UK
- Australia does NOT have more children than UK
- 1 is NOT at least half of 3

Result: Mary and John DO NOT meet the Balance of Family Test.

However, there may be exceptions or alternative pathways to explore (e.g., if any children are eligible to be counted differently).

**2. Key Differences: Subclass 143 vs Subclass 103**

| Factor | Subclass 143 (Contributory) | Subclass 103 (Non-contributory) |
|--------|----------------------------|--------------------------------|
| Contribution | ~$43,600 per parent (2024) | No contribution fee |
| Processing time | ~5-6 years | ~30+ years (very long queue) |
| Temporary visa | Can apply for 173 first (staggered payment) | No temporary option |
| Work rights | Full work rights as PR | Full work rights as PR |
| Medicare | Eligible after grant | Eligible after grant |

**3. Assurance of Support (AoS) Requirements**

Both visas require an AoS:

(a) Financial requirements:
- Assurer (Tom) must demonstrate minimum income threshold
- For 2 parents: approximately $60,000+ annual income (varies by circumstances)
- Or assets can be used in some cases

(b) Bond:
- Subclass 143: $10,000 bond for 2 parents (refundable after 10 years)
- Subclass 103: Similar bond requirements

(c) Duration:
- AoS lasts for 10 years
- Assurer is liable for certain social security payments during this period

**4. Advice on Visa Choice**

Unfortunately, the Balance of Family Test appears to be a significant obstacle for both visa options.

Options to explore:

(a) Verify family circumstances:
- Are Susan or David eligible for Australian residency?
- Any other children or step-children?

(b) Alternative pathways:
- Contributory Aged Parent visa (if parents were in Australia)
- Parent visa may not be viable due to Balance of Family Test

(c) If Balance of Family Test can be met:
- Subclass 143 is generally preferred despite the cost
- 30+ year wait for Subclass 103 is impractical for elderly parents
- Consider whether parents can live in Australia on other visas while waiting

(d) Practical considerations:
- Parents' age (68) - long processing times are a concern
- Health may deteriorate during long waits
- Cost of Contributory visa vs. time value

Recommendation:
1. First, thoroughly verify Balance of Family Test calculation
2. If test cannot be met, explore whether any children could become Australian residents
3. If test can be met, strongly recommend Subclass 143 despite cost
4. Consider engaging a financial advisor for the contribution payment planning`,
    explanation: '这个案例测试了父母签证的核心要求——家庭平衡测试，以及不同父母签证选项的比较，是实务中常见但复杂的咨询场景。',
    reference: 'Migration Regulations 1994, Schedule 2, Subclass 103/143; reg.1.05 (Balance of Family Test)',
    tags: ['parent visa', '103', '143', 'balance of family test', 'assurance of support'],
  },
  {
    id: 'q210',
    type: 'case',
    topic: 'law',
    difficulty: 'hard',
    question: `**CASE SCENARIO**

Carlos is a Brazilian national who has been living in Australia for 8 years. He initially came on a Student visa, then held various temporary visas. Three years ago, he was granted a Partner visa (Subclass 820/801) based on his relationship with an Australian citizen.

Last month, Carlos was convicted of aggravated burglary and sentenced to 18 months imprisonment. The offence occurred during a period of financial stress and substance abuse. Carlos has since sought treatment and expresses remorse.

Carlos has received a Notice of Intention to Consider Cancellation (NOICC) under section 501 of the Migration Act, citing his substantial criminal record (sentence of 12+ months).

Additional facts:
- Carlos has a 5-year-old Australian citizen child with his partner
- He has been the primary breadwinner for his family
- His partner has mental health issues and relies on Carlos for support
- Carlos has no other family in Australia
- If returned to Brazil, he has no support network and limited employment prospects

**Questions:**
1. What is the legal basis for the proposed cancellation?
2. What are the primary considerations the decision-maker must assess?
3. What arguments can be made in Carlos's favor?
4. What are Carlos's options if the visa is cancelled?`,
    answer: `**1. Legal Basis for Cancellation**

Section 501(3A) - Mandatory cancellation:
- Applies to persons sentenced to imprisonment for 12 months or more
- Minister MUST cancel the visa (no discretion)
- However, the Minister (or delegate) can revoke the cancellation under s.501CA

Carlos's situation:
- 18-month sentence = substantial criminal record under s.501(7)(a)
- Mandatory cancellation provisions apply
- NOICC is the first step in the cancellation process

**2. Primary Considerations (Direction No. 90)**

Primary considerations (must be given greatest weight):

(a) Protection of the Australian community:
- Nature and seriousness of the offence (aggravated burglary is serious)
- Risk of re-offending
- Carlos has sought treatment, which may reduce risk

(b) Best interests of minor children:
- Carlos has a 5-year-old Australian citizen child
- Impact of father's removal on child
- Child's right to grow up with both parents in Australia

(c) Expectations of the Australian community:
- Seriousness of the offence
- Community expectations regarding criminal behavior

Other relevant considerations:
- Strength, nature, and duration of ties to Australia (8 years, family ties)
- Impact on Australian citizen family members
- Extent of impediments if removed

**3. Arguments in Carlos's Favor**

(a) Best interests of the child:
- Child is Australian citizen with right to family life in Australia
- Removal of father would cause significant harm to child
- Child's best interests are a primary consideration

(b) Family ties and support:
- Partner has mental health issues and relies on Carlos
- Carlos is primary breadwinner
- Removal would cause severe hardship to Australian citizen family

(c) Rehabilitation:
- Carlos has sought treatment for substance abuse
- Expressions of remorse
- Low risk of re-offending if rehabilitation continues

(d) Circumstances of the offence:
- Occurred during period of financial stress
- Not a premeditated violent crime against persons
- Context matters in character assessment

(e) Impediments if removed:
- No support network in Brazil
- Limited employment prospects
- Family would lose support

**4. Options if Visa is Cancelled**

(a) Revocation application (s.501CA):
- Must apply within specific timeframe (usually 28 days)
- Request Minister to revoke the mandatory cancellation
- Present all mitigating factors and evidence
- Success rate is low but possible with strong compassionate circumstances

(b) Judicial review:
- If revocation refused, may seek judicial review
- Limited to jurisdictional error
- Cannot review merits of character assessment

(c) Partner visa re-application:
- If removed, partner may sponsor for offshore partner visa (309/100)
- But s.501 cancellation may affect future visa applications
- Character test applies to all future applications

(d) Ministerial intervention:
- If all other avenues exhausted
- Very limited prospects for s.501 cases
- Only in exceptional compassionate circumstances

Strategic considerations:
- Focus heavily on child's best interests
- Gather extensive evidence of rehabilitation
- Document partner's mental health needs
- Consider engaging lawyer for revocation application
- Prepare for possibility of removal`,
    explanation: 's.501强制取消是移民法中最严厉的措施之一。这个案例测试了强制取消程序、主要考虑因素、抗辩策略和后续选择，是Capstone考试中的高难度题型。',
    reference: 'Migration Act 1958 s.501(3A), 501CA; Direction No. 90; Convention on the Rights of the Child',
    tags: ['s.501', 'mandatory cancellation', 'character', 'substantial criminal record', 'revocation', 'best interests of child'],
  },
];
