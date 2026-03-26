export interface LegalItem {
  id: string
  type: 'act' | 'regulations' | 'schedule' | 'code' | 'case'
  section: string
  title: string
  summary: string
  content: string
  url?: string
  tags: string[]
  importance?: 'high' | 'medium' | 'low'
  examNotes?: string
}

export const legalData: LegalItem[] = [
  // ==================== Migration Act 1958 ====================
  {
    id: 'act-s5',
    type: 'act',
    section: 's.5',
    title: 'Interpretation / 释义',
    summary: '本法案的核心定义条款，包含 non-citizen、unlawful non-citizen、lawful non-citizen、visa、migration zone 等上百个关键术语的定义。',
    content: `核心定义：

1. non-citizen（非公民）
   指不是澳大利亚公民的人。

2. unlawful non-citizen（非法非公民）
   含义由第14条给出，指位于移民区内但不持有有效签证的非公民。

3. lawful non-citizen（合法非公民）
   含义由第13条给出，指位于移民区内并持有有效签证的非公民。

4. migration zone（移民区）
   由各州、领地、澳大利亚资源设施和澳大利亚海上设施组成的区域。

5. bogus document（虚假文件）
   部长有合理理由怀疑是伪造、篡改或因虚假陈述而获得的文件。

6. immigration detention（移民拘留）
   指在官员的陪同和约束下，或由官员关押在拘留中心、监狱、警察局等地点。

7. detain（拘留）
   指采取移民拘留或致使被移民拘留，包括采取合理必要的行动和使用武力。

8. remove（移除）
   指从澳大利亚移除。`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/s5.html',
    tags: ['definitions', 'non-citizen', 'unlawful', 'lawful', 'migration zone'],
    importance: 'high',
    examNotes: '必考定义条款，需熟记 non-citizen、unlawful non-citizen、lawful non-citizen 的区别。'
  },
  {
    id: 'act-s13',
    type: 'act',
    section: 's.13',
    title: 'Lawful non-citizens / 合法非公民',
    summary: '定义合法非公民为持有有效签证的非公民。',
    content: `合法非公民 = 持有有效签证的非公民

与非法非公民(s.14)相对。`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/s13.html',
    tags: ['lawful', 'visa holder'],
    importance: 'medium',
    examNotes: '与s.14对比记忆'
  },
  {
    id: 'act-s14',
    type: 'act',
    section: 's.14',
    title: 'Unlawful non-citizens / 非法非公民',
    summary: '定义非法非公民为在移民区内但不持有有效签证的非公民，可能被拘留(s.189)和移除(s.198)。',
    content: `非法非公民 = 在移民区内但不持有有效签证的非公民

法律后果：
• 可能被拘留 (s.189)
• 必须被移除 (s.198)
• 与合法非公民(s.13)相对`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/s14.html',
    tags: ['unlawful', 'detention', 'removal'],
    importance: 'high',
    examNotes: '与s.13对比记忆，注意非法非公民的法律后果'
  },
  {
    id: 'act-s36',
    type: 'act',
    section: 's.36',
    title: 'Criteria for protection visas / 保护签证标准',
    summary: '规定难民公约保护(s.36(2)(a))和补充保护(s.36(2)(aa))的依据。',
    content: `s.36(2)(a) — 难民公约保护
A criterion for a protection visa is that the applicant is a non-citizen in Australia in respect of whom Australia has protection obligations under the Refugees Convention.

s.36(2)(aa) — 补充保护
A criterion for a protection visa is that the applicant is a non-citizen in Australia in respect of whom Australia has complementary protection obligations. This applies where there are substantial grounds for believing that, as a necessary and foreseeable consequence of removal, there is a real risk the applicant will suffer significant harm.

"Significant harm" includes:
• Arbitrary deprivation of life
• Death penalty
• Torture
• Cruel, inhuman or degrading treatment or punishment
• Serious harm caused by indiscriminate violence in an armed conflict`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/s36.html',
    tags: ['protection', 'refugee', 'complementary protection'],
    importance: 'high',
    examNotes: '保护签证的核心条款，必考'
  },
  {
    id: 'act-s46',
    type: 'act',
    section: 's.46',
    title: 'Valid visa application / 有效签证申请',
    summary: '规定签证申请有效性的必要条件，无效申请不产生s.65的签发义务。',
    content: `签证申请仅在满足以下条件时有效：
(a) 申请针对申请表中所指定的签证类别
(b) 符合本条规定的标准和要求
(ba) 签证申请费已支付
(c) 未被本法或联邦任何其他法律阻止（包括s.48、s.48A、s.501E等）
(d) 未被本法或联邦任何其他法律认定为无效（包括s.46A、s.46B等）

⚠️ 无效的签证申请不产生第65条规定的签发签证义务（见第47(3)条）。

重要限制条款：
• s.48: 曾被拒签或取消签证者受限
• s.46A: 未经授权海上抵达者的申请限制
• s.501E: 因品格原因此前被拒绝或取消`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/s46.html',
    tags: ['valid application', 's.48', 's.46A'],
    importance: 'high',
    examNotes: '签证申请有效性的核心条款，与s.48密切相关'
  },
  {
    id: 'act-s48',
    type: 'act',
    section: 's.48',
    title: 'Non-citizen refused a visa or whose visa cancelled may only apply for particular visas / 申请限制',
    summary: '签证被拒或取消的非公民在澳境内只能申请指定类别签证（s.48 bar）。',
    content: `适用情形：
• 在移民区内、未持有实质签证的非公民
• 上次入境后签证申请被拒绝（非因品格原因）
• 签证被取消（s.109, s.116, s.133A, s.133C, s.134, s.137J, s.137Q）

法律后果：
只能申请"规定"类别的签证

豁免签证：
• 保护签证（Subclass 866）
• 某些过桥签证
• 规定的人道主义签证

⚠️ 对移民路径有重大影响！`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/s48.html',
    tags: ['s.48', 'application bar', 'refusal', 'onshore'],
    importance: 'high',
    examNotes: 'MARA考试最高频考点，必须掌握'
  },
  {
    id: 'act-s48A',
    type: 'act',
    section: 's.48A',
    title: 'Limitation on applications for protection visas / 保护签证申请限制',
    summary: '曾被拒保护签证或保护签证被取消的非公民，申请新的保护签证受到限制。',
    content: `保护签证被拒或取消后的申请限制

与s.48类似但专门针对保护签证`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/s48a.html',
    tags: ['s.48A', 'protection visa', 'limitation'],
    importance: 'high',
    examNotes: '与s.48对比记忆'
  },
  {
    id: 'act-s57',
    type: 'act',
    section: 's.57',
    title: 'Certain information must be given to applicant / 自然正义告知',
    summary: '决策者须将不利信息告知申请人并给予回应机会，违反构成可司法审查的管辖权错误。',
    content: `s.57(1): In making a decision on a visa application, the Minister must have regard to relevant information.

s.57(2): If the Minister considers that information would be the reason, or part of the reason, for refusing to grant the visa, the Minister must:
(a) give the applicant particulars of the information;
(b) ensure the applicant understands why it is relevant;
(c) invite the applicant to comment on it.

⚠️ This provision codifies natural justice (procedural fairness) in visa applications. A failure to comply constitutes a jurisdictional error reviewable in the Federal Court.`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/s57.html',
    tags: ['s.57', 'natural justice', 'adverse information', 'procedural fairness'],
    importance: 'high',
    examNotes: '程序公正的核心条款'
  },
  {
    id: 'act-s65',
    type: 'act',
    section: 's.65',
    title: 'Decision to grant or refuse to grant visa / 签证授予决定',
    summary: '满足所有条件必须授予；不满足任何条件必须拒绝——非裁量性。',
    content: `s.65(1): After considering a valid visa application, the Minister:
(a) if satisfied that:
    (i) the health criteria are satisfied; and
    (ii) the other criteria are satisfied;
   MUST grant the visa; or
(b) if not so satisfied — MUST refuse to grant the visa.

⚠️ Key principle: s.65 is NON-DISCRETIONARY. The Minister has no choice:
• All criteria met → MUST grant
• Any criterion not met → MUST refuse

This is distinguishable from discretionary provisions like s.116 (cancellation) where the Minister "may" take action.`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/s65.html',
    tags: ['s.65', 'must grant', 'decision-making', 'non-discretionary'],
    importance: 'high',
    examNotes: '理解\'must\'与\'may\'的区别是关键'
  },
  {
    id: 'act-s109',
    type: 'act',
    section: 's.109',
    title: 'Cancellation of visa if information incorrect / 信息不正确则取消签证',
    summary: '如果签证是基于不正确信息(无论是否故意)授予的，部长可以取消该签证。',
    content: `基于不正确信息的签证取消
• 无论信息是否故意不正确
• 与s.116的区别`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/s109.html',
    tags: ['s.109', 'incorrect information', 'cancellation'],
    importance: 'medium',
    examNotes: '与s.116的区别'
  },
  {
    id: 'act-s116',
    type: 'act',
    section: 's.116',
    title: 'Power to cancel / 取消权力',
    summary: '部长取消签证的广泛裁量权，可以取消的情形包括不符条件、虚假信息、未遵守条件、对社区构成风险等。',
    content: `s.116(1) — The Minister may cancel a visa if satisfied that:
(a) a circumstance that permitted the grant of the visa no longer exists;
(b) the holder no longer satisfies a criterion for the visa;
(c) information given for the application was incorrect;
(d) the holder has not complied with a condition of the visa;
(e) the holder is not a citizen of a country where Australia should not take such action;
(g) the Minister considers cancellation in the national interest.

Key points:
• s.116 is DISCRETIONARY ("may" cancel) — must still consider whether to exercise power
• Natural justice required per ss.119-120 before cancellation
• Exceptions: s.128 offshore cancellation without notice
• Contrast with MANDATORY cancellation under s.501(3A)`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/s116.html',
    tags: ['s.116', 'cancellation', 'discretionary', 'visa conditions'],
    importance: 'high',
    examNotes: '签证取消的核心条款，注意与s.65和s.501的区别'
  },
  {
    id: 'act-s128',
    type: 'act',
    section: 's.128',
    title: 'Cancellation of visa if holder outside Australia / 持有人在境外时取消',
    summary: '签证持有人在澳大利亚境外时，部长可以无需通知即取消签证。',
    content: `境外取消无需通知
适用于持有人在境外的情况`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/s128.html',
    tags: ['s.128', 'offshore', 'cancellation'],
    importance: 'medium',
    examNotes: '注意与境内取消的程序区别'
  },
  {
    id: 'act-s189',
    type: 'act',
    section: 's.189',
    title: 'Detention of unlawful non-citizens / 非法非公民的拘留',
    summary: '非法非公民必须被拘留，这是澳大利亚移民法的核心执行机制。',
    content: `非法非公民必须被拘留

⚠️ 拘留是强制性的，不是裁量性的`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/s189.html',
    tags: ['s.189', 'detention', 'unlawful'],
    importance: 'high',
    examNotes: '拘留制度的核心条款'
  },
  {
    id: 'act-s196',
    type: 'act',
    section: 's.196',
    title: 'Duration of detention / 拘留期限',
    summary: '非法非公民的拘留持续至被移除、被授予签证或被遣返。',
    content: `拘留持续到：
(a) 被移除出澳大利亚
(b) 被授予签证
(c) 被遣返

⚠️ 理论上可能是无限期的`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/s196.html',
    tags: ['s.196', 'detention', 'duration'],
    importance: 'high',
    examNotes: '理解拘留的法律性质'
  },
  {
    id: 'act-s198',
    type: 'act',
    section: 's.198',
    title: 'Removal from Australia of unlawful non-citizens / 非法非公民的移除',
    summary: '非法非公民必须被从澳大利亚移除。',
    content: `非法非公民必须被移除

⚠️ 移除是强制性的`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/s198.html',
    tags: ['s.198', 'removal', 'unlawful'],
    importance: 'high',
    examNotes: '移除制度的核心条款'
  },
  {
    id: 'act-s338',
    type: 'act',
    section: 's.338',
    title: 'Reviewable decisions / 可复审决定',
    summary: '定义哪些移民决定可以向AAT申请复议。',
    content: `定义可复议的移民决定
AAT复议的基础`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/s338.html',
    tags: ['s.338', 'AAT', 'reviewable decisions'],
    importance: 'high',
    examNotes: 'AAT复议的入口条款'
  },
  {
    id: 'act-s347',
    type: 'act',
    section: 's.347',
    title: 'Time limits for applications for review / 复议申请时限',
    summary: '规定向AAT申请复议的时间限制，通常21天。',
    content: `复议申请有时间限制
通常21天
可申请延期`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/s347.html',
    tags: ['s.347', 'AAT', 'time limits'],
    importance: 'medium',
    examNotes: '注意时限计算'
  },
  {
    id: 'act-s474',
    type: 'act',
    section: 's.474',
    title: 'Privative clause decisions / 管辖权限制条款',
    summary: '规定基于本法做出的决定是最终决定，但联邦法院仍可就管辖权错误进行审查。',
    content: `Privative clause限制司法审查
但联邦法院仍可就管辖权错误(jurisdictional error)进行审查

⚠️ 联邦法院和联邦巡回法院的管辖权`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/s474.html',
    tags: ['s.474', 'privative clause', 'judicial review'],
    importance: 'high',
    examNotes: '理解管辖权限制与管辖权错误的关系'
  },
  {
    id: 'act-s501',
    type: 'act',
    section: 's.501',
    title: 'Refusal or cancellation of visa on character grounds / 品格测试',
    summary: '不满足品格测试的非公民可被拒绝或取消签证。s.501(3A)规定强制取消：正在服刑且被判12个月以上监禁者。',
    content: `s.501(1)-(2): 部长可以基于品格拒绝/取消签证
s.501(3A): 强制取消 — 正在服刑且被判12个月以上监禁

品格测试失败情形：
• (a) 重大犯罪记录（死刑、终身监禁、12个月以上监禁、2次以上监禁）
• (b) 与犯罪组织关联
• (c) 一般行为不良
• (d) 对社区构成风险
• (e) 涉及儿童的性犯罪
• (g) ASIO安全评估

⚠️ MARA考试最高频考点！`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/s501.html',
    tags: ['s.501', 'character', 'cancellation', 'substantial criminal record'],
    importance: 'high',
    examNotes: 'MARA考试最高频考点，必须完全掌握'
  },
  {
    id: 'act-s501CA',
    type: 'act',
    section: 's.501CA',
    title: 'Revocation of mandatory cancellation / 撤销强制取消',
    summary: '被强制取消签证者可以向部长申请撤销。部长可以撤销如果确信存在"另一理由"。',
    content: `被s.501(3A)强制取消者可申请撤销
部长可以撤销如果确信存在"另一理由"

考虑因素：
• 在澳时间
• 社区联系
• 家庭情况
• 犯罪性质
• 再犯风险
• 不遣返义务`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/s501ca.html',
    tags: ['s.501CA', 'revocation', 'mandatory cancellation'],
    importance: 'high',
    examNotes: '与s.501(3A)配套记忆'
  },

  // ==================== Migration Regulations ====================
  {
    id: 'reg-1.09A',
    type: 'regulations',
    section: 'Reg 1.09A',
    title: 'De facto relationship / 事实伴侣关系',
    summary: '须同居12个月以上（或已登记）才构成事实伴侣关系。',
    content: `构成要件：
(a) 共同生活承诺
(b) 关系真实持续
(c) 同居或非永久分居
(d) 非近亲

12个月要求：
• 需同居12个月以上
• 例外：关系已登记或有令人同情的情况

⚠️ 与配偶(Reg 1.15A)的区别`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_reg/mr1994227/',
    tags: ['reg.1.09A', 'de facto', 'partner visa', '12 months'],
    importance: 'high',
    examNotes: '配偶签证的核心定义，必考'
  },
  {
    id: 'reg-1.15A',
    type: 'regulations',
    section: 'Reg 1.15A',
    title: 'Spouse / 配偶',
    summary: '配偶须具有合法婚姻关系，区别于事实伴侣关系。',
    content: `构成要件：
(a) 合法婚姻
(b) 婚姻有效
(c) 关系真实持续

⚠️ 与事实伴侣(Reg 1.09A)的区别`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_reg/mr1994227/',
    tags: ['reg.1.15A', 'spouse', 'marriage', 'partner visa'],
    importance: 'high',
    examNotes: '配偶签证的核心定义'
  },
  {
    id: 'sched-500',
    type: 'schedule',
    section: 'Schedule 2 - 500',
    title: 'Student Visa / 学生签证',
    summary: '学生签证(Subclass 500)的授予标准：真实临时入境者(GTE)、财务能力、英语能力、健康保险、课程要求等。',
    content: `核心标准：
• 500.211 - 真实临时入境者(GTE)
• 500.212 - 财务能力
• 500.213 - 英语能力
• 500.214 - 健康保险(OSHC)
• 500.215 - 课程要求
• 500.216 - 未成年人福利安排`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_reg/mr1994227/',
    tags: ['Subclass 500', 'student visa', 'GTE'],
    importance: 'high',
    examNotes: '学生签证的核心标准，必考'
  },
  {
    id: 'sched-189',
    type: 'schedule',
    section: 'Schedule 2 - 189',
    title: 'Skilled Independent Visa / 独立技术移民',
    summary: '独立技术移民签证(Subclass 189)的授予标准：积分测试(至少65分)、技能评估、英语能力、年龄等。',
    content: `核心标准：
• 189.211 - 积分测试（至少65分）
• 189.212 - 技能评估
• 189.213 - 英语能力
• 189.214 - 年龄要求`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_reg/mr1994227/',
    tags: ['Subclass 189', 'skilled migration', 'points test'],
    importance: 'high',
    examNotes: '技术移民的核心标准'
  },
  {
    id: 'sched-190',
    type: 'schedule',
    section: 'Schedule 2 - 190',
    title: 'Skilled Nominated Visa / 州担保技术移民',
    summary: '州担保技术移民签证(Subclass 190)的授予标准：州/领地提名、积分测试、技能评估、英语能力等。',
    content: `核心标准：
• 190.211 - 州/领地提名
• 190.212 - 积分测试
• 190.213 - 技能评估
• 190.214 - 英语能力`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_reg/mr1994227/',
    tags: ['Subclass 190', 'skilled migration', 'state nomination'],
    importance: 'high',
    examNotes: '州担保的核心要求'
  },
  {
    id: 'sched-491',
    type: 'schedule',
    section: 'Schedule 2 - 491',
    title: 'Skilled Work Regional Visa / 偏远地区技术移民',
    summary: '偏远地区技术移民签证(Subclass 491)的授予标准：州/领地提名或亲属担保、偏远地区居住承诺、积分测试等。',
    content: `核心标准：
• 491.211 - 州/领地提名或亲属担保
• 491.212 - 偏远地区居住承诺
• 491.213 - 积分测试
• 491.214 - 技能评估`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_reg/mr1994227/',
    tags: ['Subclass 491', 'skilled migration', 'regional'],
    importance: 'high',
    examNotes: '偏远地区签证的核心要求'
  },
  {
    id: 'sched-482',
    type: 'schedule',
    section: 'Schedule 2 - 482',
    title: 'Temporary Skill Shortage Visa / 临时技能短缺签证',
    summary: '临时技能短缺签证(Subclass 482)的授予标准：标准商业担保或劳动协议、真实职位、技能资格经验等。',
    content: `核心标准：
• 482.211 - 标准商业担保或劳动协议
• 482.212 - 真实职位
• 482.213 - 技能资格经验
• 482.214 - 英语能力`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_reg/mr1994227/',
    tags: ['Subclass 482', 'employer sponsored', 'TSS'],
    importance: 'high',
    examNotes: '雇主担保的核心签证'
  },
  {
    id: 'sched-820',
    type: 'schedule',
    section: 'Schedule 2 - 820/801',
    title: 'Partner Visa Onshore / 境内配偶签证',
    summary: '境内配偶签证(Subclass 820临时/801永久)的授予标准：配偶或事实伴侣关系、担保人批准、关系真实持续等。',
    content: `核心标准：
• 820.211 - 配偶或事实伴侣关系
• 820.212 - 关系真实持续
• 820.213 - 担保人批准
• 820.214 - 健康品格`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_reg/mr1994227/',
    tags: ['Subclass 820', 'Subclass 801', 'partner visa'],
    importance: 'high',
    examNotes: '配偶签证的核心标准'
  },
  {
    id: 'sched-866',
    type: 'schedule',
    section: 'Schedule 2 - 866',
    title: 'Protection Visa / 保护签证',
    summary: '保护签证(Subclass 866)的授予标准：符合s.36的难民公约保护或补充保护义务、安全品格审查等。',
    content: `核心标准：
• 866.211 - 符合s.36保护义务
• 866.212 - 补充保护
• 866.213 - 安全品格审查
• 866.214 - 签证申请费`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_reg/mr1994227/',
    tags: ['Subclass 866', 'protection visa', 'refugee'],
    importance: 'high',
    examNotes: '保护签证的核心标准，与Migration Act s.36配合使用'
  },
  {
    id: 'sched-6D',
    type: 'schedule',
    section: 'Schedule 6D',
    title: 'Points Test / 积分测试',
    summary: 'Schedule 6D规定技术移民签证(189, 190, 491)的积分测试计算方法。最低通过分数为65分。',
    content: `最低通过分数：65分

积分项目：
• 年龄（25-32岁）：30分
• 英语能力（Superior）：20分
• 海外工作经验（8年+）：15分
• 澳洲工作经验（8年+）：20分
• 学历（博士）：20分
• 澳洲学习：5分
• 社区语言（NAATI）：5分
• 配偶技能：10分
• 州担保（190）：5分
• 偏远地区担保（491）：15分`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_reg/mr1994227/',
    tags: ['Schedule 6D', 'points test', '189', '190', '491'],
    importance: 'high',
    examNotes: '技术移民的核心评分标准，必考'
  },
  {
    id: 'sched-8',
    type: 'schedule',
    section: 'Schedule 8',
    title: 'Visa Conditions / 签证条件',
    summary: 'Schedule 8包含所有签证条件的编码(8xxx)及其具体要求。常见条件包括8101(不得工作)、8104(学生签证每两周48小时工作限制)、8501(维持健康保险)等。',
    content: `常见签证条件：

8101 - No work
8104 - Work limitation (40 hours per fortnight for students)
8201 - Maximum 3 months study
8202 - Maintain enrolment
8501 - Maintain health insurance
8503 - No further stay
8516 - Continue to satisfy primary criteria
8532 - Notify address change within 28 days
8533 - Notify provider of address change
8558 - Non-genuine stay limited to 12 months in 18 months

⚠️ Breach of conditions → possible cancellation under s.116`,
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_reg/mr1994227/',
    tags: ['Schedule 8', 'visa conditions', '8104', '8501', '8516'],
    importance: 'high',
    examNotes: '常见签证条件必须熟悉'
  },

  // ==================== Code of Conduct ====================
  {
    id: 'coc-overview',
    type: 'code',
    section: 'Code of Conduct',
    title: 'Code of Conduct for Registered Migration Agents 2021',
    summary: '规定注册移民代理职业行为标准的完整准则，包含10大核心义务。',
    content: `10大核心义务：

Section 15 - 依法行事
遵守法律，不得欺诈欺骗

Section 16 - 客户最佳利益
避免利益冲突

Section 17 - 提供正确建议
准确、及时、完整

Section 18 - 告知决定信息
及时告知并解释

Section 19 - 保持客户知情
定期通报进展

Section 20 - 费用处理
公平合理，书面协议

Section 21 - 保密义务
保护客户信息

Section 22 - 避免利益冲突
披露并获得同意

Section 23 - 职业赔偿保险
维持有效保险

Section 24 - 记录保存
保存至少7年`,
    url: 'https://www.legislation.gov.au/Series/F2021L01000',
    tags: ['Code of Conduct', 'ethics', 'obligations', 'CPD'],
    importance: 'high',
    examNotes: '10大义务必须熟记'
  },

  // ==================== Important Cases ====================
  {
    id: 'case-s10-2011',
    type: 'case',
    section: 'Case Law',
    title: 'Plaintiff S10/2011 v Minister [2012] HCA 31',
    summary: '品格测试的核心判例：品格测试必须基于客观证据，风险评估必须是真实的。',
    content: `法院：High Court of Australia
年份：2012
主题：Character Test / s.501

要点：
• 品格测试必须基于客观证据
• 风险评估必须是真实的，而非假设性的
• 部长必须考虑所有相关材料

⚠️ s.501品格测试的核心判例，必考`,
    url: 'https://www.austlii.edu.au/',
    tags: ['case law', 's.501', 'character test', 'High Court'],
    importance: 'high',
    examNotes: 's.501品格测试的核心判例'
  },
  {
    id: 'case-li',
    type: 'case',
    section: 'Case Law',
    title: 'Minister for Immigration v Li [2013] HCA 18',
    summary: '司法审查的核心判例：Privative clause (s.474)不排除对管辖权错误的审查。',
    content: `法院：High Court of Australia
年份：2013
主题：Jurisdictional Error / s.474

要点：
• Privative clause不排除管辖权错误审查
• Jurisdictional error仍可被联邦法院审查
• 区分管辖权错误和事实错误

⚠️ 司法审查的核心判例，必考`,
    url: 'https://www.austlii.edu.au/',
    tags: ['case law', 's.474', 'judicial review', 'High Court'],
    importance: 'high',
    examNotes: '司法审查的核心判例'
  },
  {
    id: 'case-szvwy',
    type: 'case',
    section: 'Case Law',
    title: 'Minister for Immigration v SZVWY [2013] FCAFC 102',
    summary: '配偶签证的核心判例：关系评估需要综合考虑经济、社交、家庭、承诺四维度。',
    content: `法院：Federal Court of Australia (Full Court)
年份：2013
主题：Partner Visa / Genuine Relationship

要点：
• 关系评估需要综合考虑多方面因素
• 四个维度：经济、社交、家庭、承诺
• 每个案件需个别评估

⚠️ 配偶签证的核心判例，必考`,
    url: 'https://www.austlii.edu.au/',
    tags: ['case law', 'partner visa', 'genuine relationship', 'Federal Court'],
    importance: 'high',
    examNotes: '配偶签证的核心判例'
  },
  {
    id: 'case-sztal',
    type: 'case',
    section: 'Case Law',
    title: 'SZTAL v Minister for Immigration [2017] HCA 14',
    summary: '补充保护的核心判例："significant harm"不包括单纯的经济困境。',
    content: `法院：High Court of Australia
年份：2017
主题：Protection Visa / Complementary Protection

要点：
• 补充保护要求严重人身伤害
• 经济困境不构成significant harm
• 需要真实和可预见的风险

⚠️ 补充保护的核心判例`,
    url: 'https://www.austlii.edu.au/',
    tags: ['case law', 'protection visa', 'complementary protection', 'High Court'],
    importance: 'high',
    examNotes: '补充保护的核心判例'
  },
  {
    id: 'case-szssj',
    type: 'case',
    section: 'Case Law',
    title: 'Minister for Immigration v SZSSJ [2016] FCAFC 154',
    summary: 's.501CA的核心判例："another reason"包括同情因素和社区联系。',
    content: `法院：Federal Court of Australia (Full Court)
年份：2016
主题：Character / s.501CA Revocation

要点：
• "another reason"范围广泛
• 包括同情因素
• 考虑社区联系

⚠️ s.501CA的核心判例`,
    url: 'https://www.austlii.edu.au/',
    tags: ['case law', 's.501CA', 'revocation', 'Federal Court'],
    importance: 'high',
    examNotes: 's.501CA的核心判例'
  }
]

export const legalCategories = [
  { key: 'all', label: '全部' },
  { key: 'act', label: 'Migration Act' },
  { key: 'regulations', label: 'Regulations' },
  { key: 'schedule', label: 'Schedule' },
  { key: 'code', label: 'Code of Conduct' },
  { key: 'case', label: '判例' }
]

export const highImportanceItems = legalData.filter(item => item.importance === 'high')
