import type { BilingualText } from '../utils/bilingual'

export interface Topic {
  id: string;
  title: BilingualText;
  subtitle: BilingualText;
  category: 'visa' | 'law' | 'ethics' | 'procedure' | 'review';
  difficulty: 'essential' | 'important' | 'advanced';
  tags: string[];
  content: Section[];
}

export interface Section {
  heading: BilingualText;
  body: BilingualText;
  type?: 'text' | 'table' | 'list' | 'warning' | 'tip';
  rows?: BilingualText[][];
  headers?: BilingualText[];
  items?: BilingualText[];
}

export const CATEGORIES = {
  visa: { label: '签证类别', color: 'bg-blue-100 text-blue-800', icon: '🛂' },
  law: { label: '核心法律', color: 'bg-purple-100 text-purple-800', icon: '⚖️' },
  ethics: { label: '职业道德', color: 'bg-green-100 text-green-800', icon: '🤝' },
  procedure: { label: '申请程序', color: 'bg-orange-100 text-orange-800', icon: '📋' },
  review: { label: '复议与复审', color: 'bg-red-100 text-red-800', icon: '🏛️' },
};

export const DIFFICULTY = {
  essential: { label: '必考', color: 'bg-red-100 text-red-700' },
  important: { label: '重要', color: 'bg-yellow-100 text-yellow-700' },
  advanced: { label: '进阶', color: 'bg-blue-100 text-blue-700' },
};

export const topicsData: Topic[] = [
  // ─── 核心法律 ───────────────────────────────────
  {
    id: 'migration-act-overview',
    title: 'Migration Act 1958 — 核心条款',
    subtitle: 'The primary legislation governing migration in Australia',
    category: 'law',
    difficulty: 'essential',
    tags: ['Act', 'Section 65', 'Section 501', 'cancellation'],
    content: [
      {
        heading: '立法概述',
        type: 'text',
        body: '《1958年移民法》(Migration Act 1958) 是澳大利亚移民制度的根本大法，确立了非公民进入和留居澳大利亚的完整法律框架。所有签证申请、取消、审查和执法操作均依据该法进行。',
      },
      {
        heading: '必考核心条款',
        type: 'table',
        headers: ['条款', '主题', '考点要点'],
        rows: [
          ['s.5', '定义', '非公民(non-citizen)、澳大利亚公民(citizen)、非法非公民(unlawful non-citizen)的定义'],
          ['s.36', '保护签证依据', '难民公约义务；补充保护义务'],
          ['s.46', '有效申请', '签证申请的有效性前提条件'],
          ['s.48', '驳回后再申请限制', '签证被拒后在澳大利亚境内不得再次申请（除有限类别）'],
          ['s.48A', '保护签证再申请限制', '保护签证申请被拒后不得重新申请'],
          ['s.57', '不利信息自然公正', '决定者须给申请人机会就不利信息作出回应'],
          ['s.65', '授予或拒绝签证', '只有满足所有标准时才能授予签证；否则必须拒绝'],
          ['s.68', '签证生效时间', '签证批准通知到达时生效（境外）或获得时（境内）'],
          ['s.116', '签证取消权力', '部长取消签证的广泛裁量权，含不申报、不符条件、违反条件等'],
          ['s.128', '可取消签证', '部长可在入境前取消签证'],
          ['s.140ZA', '担保者义务', '雇主担保的法律义务框架'],
          ['s.180A', '家庭暴力', '家庭暴力相关的签证保护条款'],
          ['s.193', '非法非公民权利', '被拘留非法非公民的基本权利'],
          ['s.198', '遣返义务', '部长/官员有义务将非法非公民遣返'],
          ['s.417', 'MRT复审后部长干预', '部长可撤销或替代MRT/RRT决定（公共利益）'],
          ['s.476', '联邦法院司法审查', '对移民决定提起司法审查的权力'],
          ['s.495A', '授权', '部长授权签证官员的权力'],
          ['s.501', '品格测试', '签证拒绝/取消的品格标准；实质性刑事记录'],
          ['s.501A', '部长取消(不顾AAT)', '部长可直接取消符合s.501品格测试的签证，不受AAT约束'],
          ['s.501CA', '取消后被通知复议权', '被取消签证者可向部长申请撤销取消'],
          ['s.503A', '保密信息', '情报/安全机构提供的信息可不披露'],
        ],
      },
      {
        heading: '关键概念：非法非公民',
        type: 'text',
        body: '非法非公民(unlawful non-citizen)指在澳大利亚境内但未持有有效签证的非公民。根据s.196，非法非公民必须被拘留。根据s.198，有义务将其遣返。理解这一概念对于案例分析至关重要。',
      },
      {
        heading: '关键概念：自然公正',
        type: 'text',
        body: '自然公正(Natural Justice / Procedural Fairness)是澳大利亚行政法的基本原则，在移民法中主要体现在：\n1. s.57 — 申请人须获得就不利信息表达意见的机会\n2. 听取意见的权利(right to be heard)\n3. 不偏私原则(rule against bias)\n\n违反自然公正可能导致决定被联邦法院或联邦巡回法院撤销。',
      },
    ],
  },
  {
    id: 'migration-regulations',
    title: 'Migration Regulations 1994 — 核心规定',
    subtitle: 'Regulations giving effect to the Migration Act',
    category: 'law',
    difficulty: 'essential',
    tags: ['Regulations', 'Schedule 2', 'Schedule 8', 'points test'],
    content: [
      {
        heading: '法规概述',
        type: 'text',
        body: '《1994年移民条例》(Migration Regulations 1994) 是《移民法1958》的细化实施规则，规定了各类签证的具体申请条件、附表标准、积分测试规则等。附表(Schedules)是本法规的核心考点。',
      },
      {
        heading: '核心定义条款',
        type: 'table',
        headers: ['条款', '定义内容'],
        rows: [
          ['reg.1.03', '本法规通用定义汇总'],
          ['reg.1.09A', '事实伴侣关系(de facto relationship)定义：须同居12个月以上'],
          ['reg.1.12', '家庭成员(family member)定义'],
          ['reg.1.15', '剩余亲属(remaining relative)定义'],
          ['reg.1.15A', '配偶(spouse)定义：法律婚姻关系'],
          ['reg.1.15B', '职业英语(vocational English)：IELTS每项≥5.0，或等效'],
          ['reg.1.15C', '胜任英语(competent English)：IELTS每项≥6.0，或等效'],
          ['reg.1.15D', '流利英语(proficient English)：IELTS每项≥7.0，或等效'],
          ['reg.1.15E', '优秀英语(superior English)：IELTS每项≥8.0，或等效'],
        ],
      },
      {
        heading: '附表体系',
        type: 'table',
        headers: ['附表', '内容', '重要性'],
        rows: [
          ['Schedule 1', '签证类别(visa classes)列表', '高'],
          ['Schedule 2', '各签证子类的具体授予标准', '极高 — 每个签证条件均在此'],
          ['Schedule 3', '非法非公民附加标准', '高'],
          ['Schedule 4', '公共利益标准(PIC)', '高'],
          ['Schedule 5', '特殊返回标准', '中'],
          ['Schedule 6A/6D', '技术移民积分测试', '极高'],
          ['Schedule 7', '定义(不常用)', '低'],
          ['Schedule 8', '签证条件(visa conditions)', '极高'],
          ['Schedule 13', '过渡性安排', '低'],
        ],
      },
      {
        heading: 'Schedule 8 — 核心签证条件',
        type: 'table',
        headers: ['条件编号', '内容', '适用签证'],
        rows: [
          ['8101', '不得在澳工作（除非有明确允许）', '旅游签证等'],
          ['8102', '开始课程学习后才能工作', '学生签证'],
          ['8104', '每两周工作时长限制(当前48小时/两周)', '学生签证(500)'],
          ['8202', '在读注册学习机构', '学生签证'],
          ['8501', '必须持有适当的健康保险(OSHC)', '学生签证'],
          ['8516', '持续符合签证授予时的标准', '多类签证'],
          ['8532', '地址通知义务(7个工作日内)', '多类签证'],
          ['8535', '不得有违法行为', '多类签证'],
          ['8558', '500万澳元以上资产(商业创新)要求', '商业类签证'],
        ],
      },
    ],
  },
  {
    id: 'code-of-conduct',
    title: '行为准则 — Code of Conduct 2021',
    subtitle: 'Code of Conduct for Registered Migration Agents 2021',
    category: 'ethics',
    difficulty: 'essential',
    tags: ['Code of Conduct', 'ethics', 'professional obligations', 'CPD'],
    content: [
      {
        heading: '行为准则概述',
        type: 'text',
        body: '《2021年注册移民代理行为准则》(Code of Conduct for Registered Migration Agents 2021) 规定了注册移民代理(RMA)的职业行为标准。违反行为准则可能导致纪律处分，包括警告、暂停执照或注销注册。',
      },
      {
        heading: '核心义务一览',
        type: 'list',
        items: [
          '诚实与诚信(Honesty and integrity)：不得欺骗、误导客户或政府部门',
          '胜任能力(Competence)：只在自己能胜任的领域提供服务',
          '忠诚义务(Loyalty)：将客户利益置于自身利益之上',
          '保密义务(Confidentiality)：保护客户信息不泄露给第三方',
          '利益冲突(Conflict of interest)：发现冲突须披露并寻求同意',
          '费用公平(Fees)：费用须事先告知，不得收取不合理费用',
          '代理协议(Written agreement)：提供移民协助前须签订书面服务协议',
          '持续专业发展(CPD)：每年完成10小时CPD培训',
          '及时回应(Prompt response)：在合理时间内回复客户',
        ],
      },
      {
        heading: '代理协议要求',
        type: 'text',
        body: '在提供移民协助(immigration assistance)之前，必须与客户签订书面代理协议，内容须包含：\n① 服务范围说明\n② 费用及收费方式\n③ 投诉程序告知\n④ 代理人注册号(MARN)\n⑤ 客户的权利和责任',
      },
      {
        heading: '禁止行为',
        type: 'list',
        items: [
          '不得以成功为前提收费(no win no fee — 有限制)',
          '不得向政府官员行贿',
          '不得在超出知识范围时仍继续代理',
          '不得在利益冲突情况下继续代理而不披露',
          '不得误导性宣传',
          '不得保留客户原始文件(只可保留副本)',
          '不得向客户收取超出实际支出的签证费、政府费',
        ],
      },
      {
        heading: '投诉与纪律处分',
        type: 'text',
        body: '针对注册移民代理的投诉可向OMARA(移民代理注册管理局)提出。OMARA有权进行调查，处分结果包括：发出警告、公开谴责、暂停注册(最长2年)、注销注册、拒绝续期注册。严重违规还可能被转介澳大利亚联邦警察。',
      },
    ],
  },
  {
    id: 'student-visa-500',
    title: 'Subclass 500 — 学生签证',
    subtitle: 'Student Visa — the most commonly tested visa type',
    category: 'visa',
    difficulty: 'essential',
    tags: ['500', 'student', 'GTE', 'OSHC', '8104', 'work conditions'],
    content: [
      {
        heading: '签证概述',
        type: 'text',
        body: '学生签证(Subclass 500)允许外国学生在澳大利亚就读注册的学习机构(registered provider)。该签证是Capstone考试最常测试的签证类型，涉及GTE测试、工作权限、签证条件等多个考点。',
      },
      {
        heading: '主要申请条件(Schedule 2)',
        type: 'table',
        headers: ['条件类型', '具体要求'],
        rows: [
          ['录取通知', '须持有有效的电子学习确认函(CoE)'],
          ['GTE测试', '真实临时入境者(Genuine Temporary Entrant)：意图在完成学习后离澳'],
          ['英语能力', '根据就读课程等级有不同要求；部分课程可豁免'],
          ['资金能力', '须证明有足够资金支付学费及生活费(当前约AUD $29,710/年 + 学费)'],
          ['健康要求', '满足健康标准(公共利益标准 PIC 4005)'],
          ['品格要求', '满足品格标准(PIC 4001-4004)；18岁以下须填写警察记录'],
          ['OSHC', '必须购买海外学生医疗保险(Overseas Student Health Cover)'],
          ['未成年人', '未满18岁须满足监护人要求'],
        ],
      },
      {
        heading: 'GTE — 真实临时入境者测试',
        type: 'text',
        body: '签证官员评估GTE的考量因素：\n① 学生的移民状况(immigration history)\n② 申请签证类型与学习目的的关联性\n③ 经济状况和个人情况\n④ 所选学习机构和课程\n⑤ 潜在移民风险\n\n⚠️ 这是综合性判断，没有单一决定性因素。',
      },
      {
        heading: '工作权限',
        type: 'text',
        body: '500签证持有者及随行家属(secondary applicants)的工作限制：\n- 课程学习开始后：每两周最多工作48小时（条件8104）\n- 课程尚未开始：不得工作\n- 注意：澳大利亚政府在2023年临时取消了每两周40小时限制，后在2023年7月恢复为48小时/两周（2023年7月1日起）',
      },
      {
        heading: '签证条件',
        type: 'table',
        headers: ['条件', '内容'],
        rows: [
          ['8104', '课程开始后每两周不超过48小时工作'],
          ['8202', '须在注册学习机构就读'],
          ['8501', '须持有充足的OSHC'],
          ['8516', '持续满足申请时的标准'],
          ['8532', '通知DHA地址变更'],
        ],
      },
      {
        heading: '违反签证条件的后果',
        type: 'text',
        body: '违反签证条件可触发s.116取消，包括：\n- 超时工作\n- 未维持OSHC\n- 未在注册机构就读\n- 未通知地址变更\n在决定取消前，必须给予持证人自然公正机会(s.119-120)。',
      },
    ],
  },
  {
    id: 'skilled-migration',
    title: '技术移民签证 — Subclass 189/190/491',
    subtitle: 'Skilled Independent, State Nominated & Regional Sponsored',
    category: 'visa',
    difficulty: 'essential',
    tags: ['189', '190', '491', 'points test', 'EOI', 'SkillSelect', 'SOL', 'MLTSSL'],
    content: [
      {
        heading: '三种技术移民签证比较',
        type: 'table',
        headers: ['签证', '名称', '担保', '积分加成', 'PR/TR', 'ANZSCO'],
        rows: [
          ['189', 'Skilled Independent', '无需', '无', 'PR（永居）', 'MLTSSL'],
          ['190', 'Skilled Nominated', '州/领地政府', '+5分', 'PR（永居）', 'MLTSSL+STSOL'],
          ['491', 'Skilled Work Regional', '州政府/亲属', '+15分', 'TR（临时5年）', 'MLTSSL+ROL'],
        ],
      },
      {
        heading: '申请流程',
        type: 'list',
        items: [
          '第一步：职业评估(Skills Assessment) — 由指定评估机构进行',
          '第二步：在SkillSelect提交意向表(EOI)',
          '第三步：等待邀请(Invitation to Apply, ITA)',
          '第四步：收到ITA后60天内正式申请签证',
          '第五步：提交所有材料并等待决定',
        ],
      },
      {
        heading: '积分测试(Points Test) — Schedule 6D',
        type: 'table',
        headers: ['因素', '积分'],
        rows: [
          ['年龄 18-24岁', '25分'],
          ['年龄 25-32岁', '30分（最高）'],
          ['年龄 33-39岁', '25分'],
          ['年龄 40-44岁', '15分'],
          ['英语：胜任(IELTS 6)', '0分（基本要求）'],
          ['英语：流利(IELTS 7)', '10分'],
          ['英语：优秀(IELTS 8)', '20分'],
          ['境外工作经验 3-4年', '5分'],
          ['境外工作经验 5-7年', '10分'],
          ['境外工作经验 8年+', '15分'],
          ['澳境内工作经验 1-2年', '5分'],
          ['澳境内工作经验 3-4年', '10分'],
          ['澳境内工作经验 5-7年', '15分'],
          ['澳境内工作经验 8年+', '20分'],
          ['学历：博士(澳大利亚院校)', '20分'],
          ['学历：学士或以上(澳大利亚院校)', '15分'],
          ['学历：学士或以上', '10分'],
          ['专科(澳洲职业类)diploma', '10分'],
          ['澳洲学习 — 2年学士+', '5分'],
          ['社区语言(NAATI认证)', '5分'],
          ['伴侣技术资格', '10分(两者均符合)/5分(仅一人符合)'],
          ['州担保(190)', '+5分'],
          ['区域担保(491)', '+15分'],
        ],
      },
      {
        heading: '最低分数线',
        type: 'text',
        body: '190/189/491签证均要求最低65分，但实际邀请分数受到邀请轮次和职业稀缺性影响，通常高于65分。每个EOI轮次中DIBP从最高分开始邀请。',
      },
    ],
  },
  {
    id: 'employer-sponsored',
    title: '雇主担保签证 — Subclass 482/494/186',
    subtitle: 'Temporary Skill Shortage, Employer Sponsored Regional & ENS',
    category: 'visa',
    difficulty: 'essential',
    tags: ['482', 'TSS', '186', 'ENS', '494', 'sponsorship', 'LMT', 'TSMIT'],
    content: [
      {
        heading: '三种雇主担保签证比较',
        type: 'table',
        headers: ['签证', '名称', '时长', '目标', 'PR路径'],
        rows: [
          ['482', 'TSS(Temporary Skill Shortage)', '2年(Short-term)/4年(Medium-term)', '临时工作', '部分可转186'],
          ['494', 'Skilled Employer Sponsored Regional', '5年临时', '偏远地区工作', '可转191'],
          ['186', 'Employer Nomination Scheme', '永久', '直接PR', '—'],
        ],
      },
      {
        heading: '雇主担保资格要求',
        type: 'list',
        items: [
          '雇主须是有效法律实体(legal entity)',
          '雇主须经营真实合法的业务',
          '标准担保人(Standard Business Sponsor, SBS)须在DHA注册',
          '雇主不得有违规移民或劳工法的记录',
          '雇主须支付不低于临时技术移民收入门槛(TSMIT)的工资',
        ],
      },
      {
        heading: 'TSMIT — 临时技术移民收入门槛',
        type: 'text',
        body: '自2023年7月1日起，TSMIT为AUD $70,000/年（税前）。雇主向482签证持有人支付的工资不得低于此金额，且须不低于同等澳大利亚工人的市场薪资。这是防止移民工人被压榨的重要保障。',
      },
      {
        heading: '劳动力市场测试(LMT)',
        type: 'text',
        body: '申请482签证的职位通常须进行劳动力市场测试(Labour Market Testing)，证明澳大利亚本地没有合格员工可以胜任。\n- 测试期限：须在提出提名(nomination)前4个月内完成\n- 豁免情况：国际贸易义务豁免、执行人员、某些职业等\n- 广告要求：须在特定媒体上发布招聘广告',
      },
      {
        heading: '186 ENS 签证 — 三条路径',
        type: 'table',
        headers: ['路径', '要求', '注意'],
        rows: [
          ['直接入境(Direct Entry)', '3年相关工作经验；职业评估；英语', '针对海外申请人'],
          ['过渡(Transition)', '持482签证并在担保雇主处工作3年', '须有482持有人工作记录'],
          ['劳工协议(Labour Agreement)', '基于特定劳工协议提名', '需事先签订劳工协议'],
        ],
      },
    ],
  },
  {
    id: 'partner-visa',
    title: '伴侣签证 — Subclass 820/801 & 309/100',
    subtitle: 'Onshore and Offshore Partner Visas',
    category: 'visa',
    difficulty: 'essential',
    tags: ['820', '801', '309', '100', 'partner', 'sponsorship', 'family violence'],
    content: [
      {
        heading: '两条申请路径',
        type: 'table',
        headers: ['路径', '申请地', '临时签证', '永久签证'],
        rows: [
          ['境内', '在澳大利亚境内', '820(临时)', '801(永久)'],
          ['境外', '在澳大利亚境外', '309(临时)', '100(永久)'],
        ],
      },
      {
        heading: '关系真实性评估 — 四个方面',
        type: 'list',
        items: [
          '① 财务方面(Financial aspects)：共同财产、共同账户、相互经济支持',
          '② 同居情况(Nature of household)：共同居住、家务分工、住所安排',
          '③ 社会方面(Social aspects)：共同亲友认可、合照、出行记录',
          '④ 对关系的承诺(Commitment to each other)：对关系的长期规划、相互了解',
        ],
      },
      {
        heading: '担保人资格',
        type: 'list',
        items: [
          '须是澳大利亚公民、永久居民或符合条件的新西兰公民',
          '须年满18岁',
          '不得在过去5年内曾有任何家庭暴力行为记录',
          '不得在过去5年内曾作为担保人被批准过两次以上伴侣签证',
          '不得在5年内曾担保同一人超过一次',
        ],
      },
      {
        heading: '两年等待期',
        type: 'text',
        body: '一般情况下，从820/309临时签证转为801/100永久签证须等待约两年时间（称为"waiting period"）。在此期间，申请人须持续符合条件（关系仍在持续）。\n\n例外情况（可早于两年获PR）：\n- 长期关系(long-term relationship)：关系已满3年或有子女且满2年\n- 家庭暴力(family violence)情况下提前终止关系',
      },
      {
        heading: '家庭暴力条款',
        type: 'text',
        body: '家庭暴力条款(Family Violence Provisions)允许伴侣签证申请人在遭受家庭暴力后与担保人分居，仍可继续推进签证申请。\n- 申请人须提供家庭暴力证明（法定声明+独立专家报告，或法庭令等）\n- 适用于820/309申请人\n- 目的：防止受害者因担心失去签证而无法离开施暴者',
      },
    ],
  },
  {
    id: 'parent-visa',
    title: '父母签证 — Subclass 103/143/804/864',
    subtitle: 'Parent & Contributory Parent Visas',
    category: 'visa',
    difficulty: 'important',
    tags: ['103', '143', '804', '864', 'parent', 'balance of family', 'assurance of support'],
    content: [
      {
        heading: '父母签证类别比较',
        type: 'table',
        headers: ['类别', '签证', '费用', '等待', '类型'],
        rows: [
          ['普通', '103(境外)/804(境内)', '标准', '极长(20年+)', 'PR'],
          ['贡献制', '143(境外)/864(境内)', '高(约5万澳元+)', '较短(约3-5年)', 'PR'],
          ['临时贡献制', '173(境外)/884(境内)', '高', '2年临时', 'TR→可转143/864'],
        ],
      },
      {
        heading: '家庭平衡测试(Balance of Family Test)',
        type: 'text',
        body: '父母须满足家庭平衡测试才能申请父母签证：\n- 父母至少一半以上的子女须已移居澳大利亚(或更多子女在澳而非在其他单一国家)\n- 计算方式：所有在世子女中，在澳大利亚定居者须占多数\n- 被收养子女也计入统计',
      },
      {
        heading: '担保支持(Assurance of Support)',
        type: 'text',
        body: '父母签证申请人须有担保人提供担保支持：\n- 担保人须在澳大利亚居住\n- 担保期为2年（贡献制）或10年\n- 担保人须承诺在父母可能依赖社会福利时提供财务支持\n- 须缴纳担保支持债券(Assurance of Support bond)',
      },
    ],
  },
  {
    id: 'protection-visa',
    title: '保护签证 — Subclass 866',
    subtitle: 'Protection Visa — Refugee & Complementary Protection',
    category: 'visa',
    difficulty: 'important',
    tags: ['866', 'protection', 'refugee', 'complementary protection', 'non-refoulement'],
    content: [
      {
        heading: '两条保护路径',
        type: 'table',
        headers: ['路径', '法律依据', '核心要求'],
        rows: [
          ['难民公约保护', 's.36(2)(a)', '1951年难民公约定义的难民：基于种族、宗教、国籍、政治观点、特定社会群体受迫害'],
          ['补充保护', 's.36(2)(aa)', '若被遣返将面临重大伤害的实质性风险（但不满足难民定义）'],
        ],
      },
      {
        heading: '难民定义要素',
        type: 'list',
        items: [
          '在其本国以外(outside country of nationality)',
          '因具有充分理由的恐惧(well-founded fear)',
          '遭受迫害(persecution)',
          '基于五种原因之一：种族/宗教/国籍/政治观点/特定社会群体',
          '无法或因恐惧不愿意受本国保护',
        ],
      },
      {
        heading: '补充保护 — 重大伤害',
        type: 'list',
        items: [
          '任意剥夺生命(arbitrary deprivation of life)',
          '死刑(death penalty)',
          '酷刑、残忍或有辱人格的待遇(torture, cruel or degrading treatment)',
          '在武装冲突中对平民生命的严重威胁',
        ],
      },
      {
        heading: '不驱回原则(Non-refoulement)',
        type: 'text',
        body: '非驱回原则禁止将难民遣返至其可能受迫害或遭受重大伤害的地方。这是国际法的强制性规则(jus cogens)。澳大利亚通过s.36(2)和s.197C实施此义务。即使难民存在品格问题(s.501)，部长在作出取消或驱逐决定时也须考虑非驱回义务。',
      },
    ],
  },
  {
    id: 'bridging-visas',
    title: '过渡签证 — Bridging Visas (A/B/C/D/E/R)',
    subtitle: 'Visas that bridge the gap between substantive visas',
    category: 'visa',
    difficulty: 'important',
    tags: ['bridging visa', 'BVA', 'BVB', 'BVC', 'BVE', 'lawful status'],
    content: [
      {
        heading: '过渡签证概述',
        type: 'text',
        body: '过渡签证(Bridging Visa)是为维持持签人合法居留身份而设立的特殊签证，通常在申请人等待实质性签证(substantive visa)期间有效。过渡签证不提供长期居留权利，不能作为前往澳大利亚的入境签证使用（BVB除外）。',
      },
      {
        heading: '各类过渡签证比较',
        type: 'table',
        headers: ['类别', '授予对象', '工作权限', '出行'],
        rows: [
          ['BVA (820)', '在澳申请签证者', '视情况', '离澳后失效'],
          ['BVB (051)', '需临时出境的BVA/BVC持有人', '视情况', '可出境'],
          ['BVC (030)', '在澳未持签证时申请签证者', '一般无', '离澳后失效'],
          ['BVD (041)', '已被拒并正在审查的非公民', '一般无', '—'],
          ['BVE (050)', '非法非公民或其他特殊情况', '视情况', '离澳后失效'],
          ['BVR (060)', '可遣返非公民', '无', '—'],
        ],
      },
      {
        heading: '关键考点',
        type: 'list',
        items: [
          'BVA在申请820签证时自动授予，允许持证人在等待结果期间合法居留',
          'BVB须单独申请，允许持BVA或BVC者临时离澳再入境',
          '离澳后BVA和BVE失效 — 代理人须提醒客户此风险',
          '过渡签证持有人通常无法在澳大利亚境内申请大多数签证类别',
          'BVE通常授予给等待被遣返的非法非公民，工作权限受限',
        ],
      },
    ],
  },
  {
    id: 'review-merits',
    title: '行政复议 — AAT/IAA 审查',
    subtitle: 'Merit Review by Administrative Appeals Tribunal & IAA',
    category: 'review',
    difficulty: 'essential',
    tags: ['AAT', 'IAA', 'MRD', 'review', 'appeal', 'natural justice'],
    content: [
      {
        heading: '审查体系概述',
        type: 'text',
        body: '澳大利亚移民决定的审查分为行政审查(merit review)和司法审查(judicial review)。行政审查由行政上诉法庭(AAT)下设的移民和难民分部(MRD)及独立移民上诉机构(IAA)负责。',
      },
      {
        heading: 'AAT审查 vs IAA审查',
        type: 'table',
        headers: ['', 'AAT-MRD', 'IAA'],
        rows: [
          ['审查对象', '大多数签证拒绝/取消决定', '离境庇护申请人的保护签证拒绝'],
          ['新证据', '可提交新证据和论据', '通常不接受新证据'],
          ['程序', '较正式，通常有听证', '基于文书审查'],
          ['申请期限', '通常决定后70天内（境内）/28天（境外）', '决定后7个工作日内'],
          ['法律依据', 'Migration Act s.348-363', 'Migration Act s.473BA-473JC'],
        ],
      },
      {
        heading: 'AAT审查申请时限',
        type: 'table',
        headers: ['情形', '时限'],
        rows: [
          ['在澳大利亚境内签证拒绝/取消', '决定通知后70天内'],
          ['在澳大利亚境外签证拒绝', '决定通知后28天内'],
          ['保护签证拒绝(非离境申请人)', '决定通知后70天内'],
          ['s.501品格取消(非相互义务框架)', '决定通知后9天（快速处理）'],
        ],
      },
      {
        heading: 'AAT审查程序要点',
        type: 'list',
        items: [
          'AAT进行独立的是非曲直(merits)审查，而非仅审查程序错误',
          'AAT可维持、撤销或修改原决定',
          'AAT须遵守自然公正要求',
          '申请人可出席听证并提供证据',
          'AAT决定可进一步向联邦法院提起司法审查',
          '注意：不是所有签证决定都有AAT审查权 — 如部长直接作出的s.501决定',
        ],
      },
      {
        heading: '司法审查',
        type: 'text',
        body: '联邦法院(Federal Court)和联邦巡回法院(Federal Circuit Court)对移民决定拥有司法审查(judicial review)管辖权（s.476）。但司法审查只审查法律错误(jurisdictional error)，不进行是非曲直审查。常见的司法审查理由包括：越权行为(ultra vires)、违反自然公正、法律解释错误等。',
      },
    ],
  },
  {
    id: 'character-test',
    title: '品格测试 — s.501 Migration Act',
    subtitle: 'Character test and its implications',
    category: 'law',
    difficulty: 'essential',
    tags: ['s.501', 'character', 'substantial criminal record', 'cancellation'],
    content: [
      {
        heading: '品格测试概述',
        type: 'text',
        body: 's.501是移民法中最著名的条款之一，允许部长或授权官员拒绝或取消不满足品格测试的非公民的签证。近年来该条款被大量援用于已有犯罪记录的永久居民。',
      },
      {
        heading: '不满足品格测试的情况',
        type: 'list',
        items: [
          '① 实质性刑事记录(substantial criminal record)：单项刑期12个月以上，或总累计刑期达到',
          '② 被判定存在国家安全风险',
          '③ 在服刑期间申请签证',
          '④ 与犯罪组织有关联(criminal conduct / association)',
          '⑤ 存在跟踪、性骚扰或家庭暴力行为',
          '⑥ 对品格部长不满意的其他情况',
        ],
      },
      {
        heading: '实质性刑事记录定义',
        type: 'text',
        body: '"实质性刑事记录"(substantial criminal record)指：\n- 被判处死刑(death sentence)\n- 被判处终身监禁(life imprisonment)\n- 被判处12个月或以上的监禁\n- 被判处两项或以上任何期限的监禁刑（即使不足12个月）\n- 缓刑或社区服务令视情况而定\n\n⚠️ 即使已服满刑期，只要符合定义，仍触发品格测试',
      },
      {
        heading: '部长裁量权',
        type: 'text',
        body: '即使非公民不满足品格测试，部长仍有裁量权决定是否取消签证。裁量因素包括：\n- 在澳居住时长\n- 与澳大利亚的紧密程度(ties)\n- 家庭因素(子女等)\n- 犯罪的性质和严重程度\n- 再犯风险\n- 非驱回义务(non-refoulement)',
      },
    ],
  },
  {
    id: 'visa-cancellation',
    title: '签证取消 — s.116 & 相关条款',
    subtitle: 'Visa cancellation powers and procedures',
    category: 'law',
    difficulty: 'essential',
    tags: ['s.116', 'cancellation', 's.128', 's.133A', 'natural justice'],
    content: [
      {
        heading: 's.116 — 一般取消权力',
        type: 'text',
        body: 's.116赋予部长/授权官员广泛的签证取消权力，当签证持有人：\n① 不满足签证条件(条件编码8xxx)\n② 提供错误信息(misrepresentation)\n③ 不符合持续授予标准\n④ 存在品格问题(品格条款)\n\n注意：s.116是裁量性的(discretionary)，即使满足取消触发条件，决策者仍须考虑是否行使取消权力。',
      },
      {
        heading: '取消前的自然公正要求',
        type: 'text',
        body: '在实施s.116取消前，通常须通知持证人并给予其回应机会(s.119-120)。但以下情况可例外：\n- 境外取消(s.128)：无须通知\n- 强制性取消(Mandatory cancellation)如s.501(3A)：无裁量权\n- 紧急情况\n\n未遵守自然公正程序可能使取消决定因司法审查而被撤销。',
      },
      {
        heading: '强制性取消 — s.501(3A)',
        type: 'text',
        body: '当签证持有人被判处12个月或以上监禁，或被认定为不满足品格测试，且符合以下情形时，取消为强制性的：\n- 被判处合计12个月以上监禁\n- 或在服刑\n\n在强制性取消情况下，决策者无裁量权，必须取消签证。但当事人仍可向部长申请撤销取消(s.501CA)。',
      },
    ],
  },
  {
    id: 'health-character',
    title: '健康和品格标准 — 公共利益标准',
    subtitle: 'Public Interest Criteria (PIC) — Health & Character',
    category: 'law',
    difficulty: 'important',
    tags: ['PIC', 'health', 'character', 'waiver', 'tuberculosis'],
    content: [
      {
        heading: '公共利益标准(PIC)体系',
        type: 'text',
        body: '大多数签证申请须满足Schedule 4中的公共利益标准(Public Interest Criteria, PIC)。PIC分为三类：\n- PIC 4001-4003：品格标准\n- PIC 4004：国家安全\n- PIC 4005-4007：健康标准\n- PIC 4010-4020：其他公共利益',
      },
      {
        heading: '健康要求(PIC 4005)',
        type: 'list',
        items: [
          '申请人须做胸部X光检查（针对结核病风险）',
          '18岁以上须做全面体检',
          '不得患有对澳大利亚公共卫生构成重大风险的疾病',
          '不得需要消耗大量公共卫生资源',
          '部分类别(如保护签证、人道主义签证)健康要求可豁免',
        ],
      },
      {
        heading: '健康豁免(Health Waiver)',
        type: 'text',
        body: '不满足健康要求的申请人可申请健康豁免。豁免判断因素：\n- 家庭联系的程度\n- 人道主义因素\n- 对澳大利亚的经济贡献\n- 申请人的就业或学习情况\n- 实际医疗成本评估\n\n⚠️ 健康豁免是裁量性的，并非所有申请人都能获批。',
      },
    ],
  },
  {
    id: 'sponsor-obligations',
    title: '担保人义务 — Sponsor Obligations',
    subtitle: 'Obligations for approved sponsors under 482/494 visas',
    category: 'procedure',
    difficulty: 'important',
    tags: ['sponsor', 'SBS', 'obligations', 'monitoring', 'sanctions'],
    content: [
      {
        heading: '担保人核心义务',
        type: 'list',
        items: [
          '① 支付不低于TSMIT($70,000/年)的工资',
          '② 确保工作条件不低于澳大利亚同等员工',
          '③ 发生担保人无力雇用时协助被担保人离境(Travel costs)',
          '④ 确保被担保人只从事提名职位的工作',
          '⑤ 保留工资记录最少5年',
          '⑥ 告知DHA被担保人的相关变化(如离职)',
          '⑦ 不向被担保人转嫁担保费用',
        ],
      },
      {
        heading: '担保违规处罚',
        type: 'text',
        body: '违反担保义务可能导致：\n- 罚款(civil penalties)：最高每次违规数万澳元\n- 被取消担保人资格\n- 被禁止再次申请担保资格\n- 严重情况下可能面临刑事处罚',
      },
    ],
  },
  {
    id: 'application-procedures',
    title: '签证申请程序 — 从申请到决定',
    subtitle: 'Application process, valid applications, and decision-making',
    category: 'procedure',
    difficulty: 'essential',
    tags: ['application', 'valid', 's.46', 's.65', 'processing', 'PAM'],
    content: [
      {
        heading: '有效申请要求(s.46)',
        type: 'list',
        items: [
          '使用正确的申请表格(Approved form)',
          '缴纳正确的申请费(VAC)',
          '在规定地点申请(境内/境外)',
          '满足任何其他有效性要求(如附上必要文件)',
          '由授权人签署',
        ],
      },
      {
        heading: '申请决定(s.65)',
        type: 'text',
        body: 's.65是签证决定的核心条款：\n- 若满足所有签证授予标准：部长必须(must)授予签证\n- 若不满足任何一项标准：部长必须(must)拒绝签证\n\n这意味着签证授予/拒绝并非裁量性的，而是标准触发性的。一旦满足条件，部长没有选择余地，必须授予签证。',
      },
      {
        heading: '政策文件(PAM)',
        type: 'text',
        body: 'PAM(Procedures Advice Manual，程序建议手册)是DHA内部的操作指南，提供对移民法的官方解释。PAM对签证申请人没有法律约束力，但对于理解DHA如何解释和适用法律具有重要参考价值。',
      },
      {
        heading: '申请前注意事项(代理人职责)',
        type: 'list',
        items: [
          '核实客户的移民史(immigration history)',
          '检查是否存在任何申请限制(如s.48禁止令)',
          '确认客户身份证明文件的真实性',
          '告知客户提供真实信息的重要性及后果',
          '及时跟进申请进度，回复DHA要求',
        ],
      },
    ],
  },
];
