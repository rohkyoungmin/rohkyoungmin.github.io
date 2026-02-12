(function () {
  'use strict';

  var THEME_KEY = 'portfolio-theme';
  var LANG_KEY = 'portfolio-lang';

  var translations = {
    en: {
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.education': 'Education',
      'nav.experience': 'Experience',
      'nav.publications': 'Publications',
      'nav.awards': 'Awards',
      'nav.patent': 'Patent',
      'nav.projects': 'Projects',
      'nav.contact': 'Contact',
      'hero.title1': 'Kyoungmin Roh',
      'hero.title2': 'Cybersecurity Researcher',
      'hero.desc': 'Pursuing an academic career in cybersecurity.',
      'hero.focusLabel': 'Research focus:',
      'hero.focus1': 'Learning-based IDS under concept drift',
      'hero.focus2': 'Post-quantum cryptography in CPS and embedded systems',
      'hero.focus3': 'Secure system design that remains trustworthy over time',
      'hero.btn': 'View Publications',
      'hero.scroll': 'Scroll',
      'section.about': 'About',
      'section.education': 'Education',
      'section.experience': 'Experience',
      'section.publications': 'Publications',
      'section.awards': 'Awards & Honors',
      'section.patent': 'Patent',
      'section.projects': 'Projects',
      'section.contact': 'Contact',
      'about.objectiveTitle': 'Objective',
      'about.objectiveText': 'To pursue an academic career in cybersecurity as a professor, contributing to society through impactful research and education. I aim to develop technologies that enhance security and people\'s lives while mentoring the next generation of researchers who will advance the field beyond my own contributions.',
      'about.interestsTitle': 'Research Interests',
      'about.interestsText': 'I am interested in the security of complex systems that must operate reliably under evolving threats and broken assumptions. My current research focuses on CPS and system security, with a particular emphasis on learning-based intrusion detection (IDS) under concept drift and the secure deployment of post-quantum cryptography (PQC) in CPS and embedded systems. My research goal is to establish principled foundations for designing secure systems that remain trustworthy over time, across various environments, and during the post-quantum transition.',
      'edu.degree': 'B.E. in Cybersecurity',
      'edu.meta': 'Mar 2021 – Expected Jan 2027 · Yongin, Republic of Korea',
      'edu.li1': 'Undergraduate (Junior → Senior)',
      'edu.li2': 'GPA: 3.0 / 4.5',
      'edu.li3': 'Relevant coursework: AI Security, CPS Security, Embedded Security, Cryptography',
      'work.labLink': 'Lab Homepage →',
      'work.position': 'Position: Research Intern',
      'work.iuOrg': 'Department of Computer Science, Indiana University Bloomington',
      'work.iuPeriod': 'Period: Oct 2025 – Present · Bloomington, U.S.',
      'work.iu1': 'Analyzing security risks and failure modes in open-source CPS software',
      'work.iu2': 'Investigating vulnerability patterns and attack surfaces in long-lived CPS',
      'work.iu3': 'Surveying CPS-related vulnerabilities using OSV, GitHub Issues, and forums',
      'work.iu4': 'Developing CPS-specific vulnerability characterization',
      'work.csosOrg': 'Department of Software Science, Dankook University',
      'work.csosPeriod': 'Period: Mar 2025 – Present · Yongin, Republic of Korea',
      'work.csos1': 'Researching learning-based IDS under severe concept drift without retraining',
      'work.csos2': 'Studying graph-based IDS using API co-occurrence & SNA',
      'work.csos3': 'Investigating TEE-based lightweight PQC deployment on ARM TrustZone',
      'work.csos4': 'Collaborative research on Android Intrusion Detection System (IDS) with <strong>Illinois State University (Advisor: Prof. Hyoil Han, Prof. Kyoungwon Seo)</strong>',
      'work.csos5': 'Collaborative research on Automotive Cyber-Physical System (CPS) Security with <strong>Seoul National University SORLab (Advisor: Prof. Jiwon Seo, Ph.D Martin Kayondo)</strong>',
      'work.katusaTitle': 'KATUSA (Korean Augmentation to the U.S. Army)',
      'work.kaOrg': 'U.S. 8th Army, Camp Carroll, 35th ADA Brigade, Echo Company · Waegwan, South Korea',
      'work.ka1': 'Served as interpreter and liaison during joint U.S.–ROK operations',
      'work.ka2': 'Appointed as Environmental Officer; conducted environmental and operational safety inspections in accordance with military compliance standards',
      'work.ka3': 'Awarded the <em>Army Commendation Medal (ARCOM)</em> by a U.S. Brigadier General',
      'work.ka4': 'Won <em>Best KATUSA Award</em> and <em>Best Warrior Squad</em> for duty performance',
      'pub.catSCI': 'SCI Journals',
      'pub.catDomestic': 'Domestic Journals',
      'pub.catIntl': 'International Conferences',
      'pub.catDomConf': 'Domestic Conferences',
      'pub.catThesis': 'Thesis',
      'pub.catOther': 'Other Research Papers',
      'pub.viewPaper': 'View Paper →',
      'pub.viewCert': 'View certificate →',
      'award.t1': 'Specialized Project Scholarship',
      'award.d1': 'Awarded for strong track record of academic awards and high-quality project execution; recognized for excellence in AI security–oriented research.',
      'award.o1': 'Dankook University, Department of Cybersecurity',
      'award.t2': 'Academic Research Scholarship',
      'award.d2': 'Published a paper at a leading domestic academic conference as an undergraduate; awarded for research potential and academic excellence.',
      'award.o2': 'Dankook University, National Center of Excellence in Software',
      'award.t3': 'Cyber Security Contest 1st Place Award',
      'award.d3': '"A Lightweight Secret-Isolated Post-Quantum Cryptographic Architecture for ARM TrustZone"; isolated secret-based computation in PQC Kyber.',
      'award.t4': 'KSC 2025 Best Paper Award',
      'award.d4': '"Drift-Aware Security Module Based on Louvain Communities for Retraining-Free Android Malware Detection"; recognized for robustness and scalability under concept drift.',
      'award.o4': 'Korean Institute of Information Scientists and Engineers (KIISE)',
      'award.t5': 'Audience Choice Award, Capstone Festival',
      'award.d5': 'Qrust: Secure QR & AI-Based Phishing Detection System; HMAC-signed QR validation, ML-based malicious URL detection.',
      'award.t6': 'Participation Prize (3rd Place), Dankook Startup Hackathon',
      'award.d6': 'Lead developer and planner for <em>Ddobak</em>, an LLM-based speech correction app; recognized for innovative AI-driven assistive healthcare design.',
      'award.t7': 'WDSC 2025 Best Paper Award',
      'award.d7': 'Android malware detection using API co-occurrence graphs and Louvain communities; selected for robustness under concept drift.',
      'award.o5': 'KIISE',
      'award.t8': 'The Army Commendation Medal (ARCOM)',
      'award.d8': 'For commendable service as equipment records and parts clerk KATUSA; supported the unit\'s mission.',
      'award.o6': 'United States Department of the Army',
      'award.t9': 'Best KATUSA Award',
      'award.d9': 'Outstanding marksmanship performance; set an example for fellow KATUSA soldiers.',
      'award.o7': 'Eighth United States Army Republic of Korea Army Support Group',
      'award.t10': '1st Place, Turing Cipher Idea Contest',
      'award.d10': 'Hybrid post-quantum signature scheme combining Lamport signatures and Merkle trees; evaluated on originality, cryptographic soundness, and feasibility.',
      'award.t11': 'Specialized Project Scholarship',
      'award.d11': 'Awarded for research initiative in AI security and high-quality project execution.',
      'award.t12': 'Admission Scholarship',
      'award.d12': 'Awarded for academic excellence and demonstrated leadership potential.',
      'award.o8': 'Dankook University',
      'patent.meta': 'Korean Patent Application No. 10-2025-0098855 <em>(Filed)</em>',
      'proj.link': 'GitHub →',
      'proj.1.title': 'Split-Kyber for ARM TrustZone-A',
      'proj.1.tag': 'Secret-Isolated PQC · 1st Place, Cyber Security Contest',
      'proj.1.desc': 'Implemented a split execution framework for CRYSTALS-Kyber (ML-KEM) on ARM TrustZone-A. Secret-dependent operations run exclusively in Secure World (TEE), ensuring strict key isolation. Aims to minimize the Trusted Computing Base (TCB) while maintaining correctness and performance.',
      'proj.2.title': 'LV.0: LLM Vulnerability Zero',
      'proj.2.tag': 'LLM-powered Security Vulnerability Reporter',
      'proj.2.desc': 'Developed an AI-based static analysis and automated reporting framework for open-source vulnerabilities. Integrated GitHub workflow automation and NLP-based risk summarization. Led backend and AI system design using Flask and FastAPI.',
      'proj.3.title': 'ASX: Android API Sequence Extractor',
      'proj.3.tag': 'Static Analysis · Electron GUI',
      'proj.3.desc': 'Designed a static analysis pipeline to extract API-level call sequences from DEX files. Built preprocessing logic for multi-instance learning (MIL) workflows. Developed as a cross-platform Electron-based GUI tool.',
      'proj.4.title': 'Qrust: Secure QR & AI Phishing Detector',
      'proj.4.tag': 'Capstone · Audience Choice Award',
      'proj.4.desc': 'Developed a secure QR generator and mobile phishing detection system using ML classifiers. Implemented HMAC-signed QR content and Flask-based malicious URL detection API. End-to-end security workflow: scanning → validation → risk scoring.',
      'proj.5.title': 'Digital Forensic Toolkit for Hyundai Avante (CN7)',
      'proj.5.tag': 'IVI Forensics · Log-based Event Reconstruction',
      'proj.5.desc': 'Developed a forensic extraction and log-based event reconstruction system for Android-based IVI systems. Automated vehicle log parsing and visualization for forensic workflows. Designed for researchers analyzing Hyundai vehicle platforms.',
      'proj.6.title': 'Post-Quantum Signature System',
      'proj.6.tag': 'Lamport + Merkle Tree · 1st Place, Turing Cipher Idea Contest',
      'proj.6.desc': 'Implemented a hybrid post-quantum signature system combining Lamport OTS and Merkle tree aggregation. Python-based prototype demonstrating signing, verification, and one-time key management.',
      'proj.7.title': 'AI-powered Document Summarization Web Application',
      'proj.7.tag': 'FastAPI · Claude API · Docker',
      'proj.7.desc': 'Developed a FastAPI-based backend API for user authentication and project management. Implemented PDF/TXT upload and AI summarization via Claude API integration. Provided Swagger UI / ReDoc documentation, SQLite persistence, and Docker-based deployment.',
      'proj.8.title': 'Ddobak — LLM-based Speech & Hearing Therapy App',
      'proj.8.tag': 'Flutter · 3rd Place, Dankook Startup Hackathon',
      'proj.8.desc': 'Developed an LLM-powered pronunciation correction app supporting hearing-impaired users. Led UI/UX design and ideation. Built a Flutter prototype integrated with an AI feedback system.',
      'proj.9.title': 'Smart Greenhouse AI',
      'proj.9.tag': 'CNN · Transfer Learning · IoT-ready ML',
      'proj.9.desc': 'Trained a CNN-based classifier for pest detection in agriculture. Applied image augmentation and transfer learning for robustness. Developed an IoT-ready ML pipeline using Google Colab.',
      'proj.10.title': 'Selenium Web Crawler',
      'proj.10.tag': 'Automation · Dataset for LLM Research',
      'proj.10.desc': 'Built an automation script for scraping product reviews to generate datasets for LLM research. Used Selenium for DOM traversal and text extraction/cleaning.',
      'contact.phone': 'Phone:',
      'contact.location': 'Location:',
      'contact.email': 'Email',
      'contact.cv': 'Download CV (PDF)',
      'footer.copyright': '© 2025 Kyoungmin Roh. All rights reserved.'
    },
    ko: {
      'nav.home': '홈',
      'nav.about': '소개',
      'nav.education': '학력',
      'nav.experience': '경력',
      'nav.publications': '논문',
      'nav.awards': '수상',
      'nav.patent': '특허',
      'nav.projects': '프로젝트',
      'nav.contact': '연락처',
      'hero.title1': '노경민',
      'hero.title2': '사이버보안 연구자',
      'hero.desc': '사이버보안 분야의 학계 진출을 목표로 합니다.',
      'hero.focusLabel': '연구 분야:',
      'hero.focus1': '개념 드리프트 하의 학습 기반 침입 탐지(IDS)',
      'hero.focus2': 'CPS 및 임베디드 시스템에서의 양자내성암호(PQC)',
      'hero.focus3': '환경과 시간에 따라 신뢰를 유지하는 보안 시스템 설계',
      'hero.btn': '논문 보기',
      'hero.scroll': '스크롤',
      'section.about': '소개',
      'section.education': '학력',
      'section.experience': '경력',
      'section.publications': '논문',
      'section.awards': '수상 및 영예',
      'section.patent': '특허',
      'section.projects': '프로젝트',
      'section.contact': '연락처',
      'about.objectiveTitle': '목표',
      'about.objectiveText': '사이버보안 분야의 교수로서 학계에 기여하며, 영향력 있는 연구와 교육을 통해 사회에 기여하고자 합니다. 보안 기술을 통해 사람들의 삶의 질을 높이고, 제가 이룬 성과를 넘어 설 다음 세대 연구자를 멘토링하는 것을 목표로 합니다.',
      'about.interestsTitle': '연구 관심사',
      'about.interestsText': '변화하는 위협과 불확실한 환경에서도 안정적으로 동작해야 하는 복잡한 시스템의 보안에 관심이 있습니다. 현재 연구는 CPS 및 시스템 보안에 집중하며, 개념 드리프트(concept drift) 상황에서의 학습 기반 침입 탐지(IDS)와 CPS·임베디드 시스템에서의 양자내성암호(PQC) 안전 배포를 다룹니다. 시간과 환경이 바뀌고 양자시대가 도래해도 신뢰할 수 있는 보안 시스템을 설계하기 위한 원칙적 기반을 마련하는 것이 연구 목표입니다.',
      'edu.degree': '사이버보안 학사',
      'edu.meta': '2021년 3월 – 2027년 1월 졸업 예정 · 용인, 대한민국',
      'edu.li1': '학부 재학 (3학년 → 4학년)',
      'edu.li2': 'GPA: 3.0 / 4.5',
      'edu.li3': '관련 과목: AI 보안, CPS 보안, 임베디드 보안, 암호학',
      'work.labLink': '랩 홈페이지 →',
      'work.position': '직위: 연구 인턴',
      'work.iuOrg': '컴퓨터과학과, 인디애나 대학교 블루밍턴',
      'work.iuPeriod': '2025년 10월 – 현재 · 미국 블루밍턴',
      'work.iu1': '오픈소스 CPS 소프트웨어의 보안 위험과 고장 모드 분석',
      'work.iu2': '장기 운영 CPS에서의 취약점 패턴 및 공격 표면 조사',
      'work.iu3': 'OSV, GitHub Issues, 포럼을 활용한 CPS 관련 취약점 조사',
      'work.iu4': 'CPS 도메인에 특화된 취약점 특성화 체계 개발',
      'work.csosOrg': '소프트웨어학과, 단국대학교',
      'work.csosPeriod': '2025년 3월 – 현재 · 용인, 대한민국',
      'work.csos1': '재학습 없이 심한 개념 드리프트에 대응하는 학습 기반 IDS 연구',
      'work.csos2': 'API 동시출현 그래프와 사회연결망분석(SNA)을 활용한 그래프 기반 IDS 연구',
      'work.csos3': 'ARM TrustZone 기반 TEE에서의 경량 양자내성암호(PQC) 배포 연구',
      'work.csos4': 'Android 침입 탐지 시스템(IDS) 공동 연구: <strong>일리노이 주립대학교 (지도: 한효일 교수, 서경원 교수)</strong>',
      'work.csos5': '자동차 사이버물리시스템(CPS) 보안 공동 연구: <strong>서울대학교 SORLab (지도: 서지원 교수, Martin Kayondo 박사)</strong>',
      'work.katusaTitle': 'KATUSA (한미 연합군 한국군 보강대)',
      'work.kaOrg': '미 8군, 캠프 캐럴, 제35방공포병여단 Echo 중대 · 왜관, 대한민국',
      'work.ka1': '한미 합동 작전 시 통역 및 연락 업무 수행',
      'work.ka2': '환경 검사원으로 임명되어 군 규정에 따른 환경·작전 안전 점검 수행',
      'work.ka3': '미군 준장으로부터 <em>육군 공로 훈장(ARCOM)</em> 수훈',
      'work.ka4': '업무 성과로 <em>최우수 KATUSA상</em> 및 <em>최우수 전투 분대상</em> 수상',
      'pub.catSCI': 'SCI Journals',
      'pub.catDomestic': 'Domestic Journals',
      'pub.catIntl': 'International Conferences',
      'pub.catDomConf': 'Domestic Conferences',
      'pub.catThesis': 'Thesis',
      'pub.catOther': 'Other Research Papers',
      'pub.viewPaper': '논문 보기 →',
      'pub.viewCert': '상장 보기 →',
      'award.t1': '특화 프로젝트 장학금',
      'award.d1': '학술 수상 실적과 고품질 프로젝트 수행을 인정받아 수여. AI 보안 분야 연구 우수성 평가.',
      'award.o1': '단국대학교 사이버보안학과',
      'award.t2': '학술 연구 장학금',
      'award.d2': '학부생 신분으로 국내 주요 학회에 논문 게재. 연구 잠재력과 학술 우수성을 인정받아 수여.',
      'award.o2': '단국대학교 SW중심대학사업단',
      'award.t3': '사이버 보안 경진대회 1등상',
      'award.d3': '「ARM TrustZone 기반 경량 비밀 분리형 양자내성 암호 아키텍처」. PQC Kyber의 비밀 분리 연산 구현.',
      'award.t4': 'KSC 2025 최우수 논문상',
      'award.d4': '「재학습 없는 Android 악성코드 탐지를 위한 Louvain 커뮤니티 기반 드리프트 인식 보안 모듈」. 개념 드리프트 하에서의 견고성과 확장성을 인정받음.',
      'award.o4': '한국정보과학회(KIISE)',
      'award.t5': '캡스톤 페스티벌 관객상',
      'award.d5': 'Qrust: 보안 QR 및 AI 기반 피싱 탐지 시스템. HMAC 서명 QR 검증과 ML 기반 악성 URL 탐지 구현.',
      'award.t6': '단국 스타트업 해커톤 3등(참가상)',
      'award.d6': 'LLM 기반 발음 교정 앱 <em>또박</em>의 기획·개발을 주도. AI 기반 보조 의료 서비스 설계로 인정받음.',
      'award.t7': 'WDSC 2025 최우수 논문상',
      'award.d7': 'API 동시출현 그래프와 Louvain 커뮤니티를 이용한 Android 악성코드 탐지 연구. 개념 드리프트 하에서의 견고성으로 선정.',
      'award.o5': '한국정보과학회(KIISE)',
      'award.t8': '육군 공로 훈장(ARCOM)',
      'award.d8': 'KATUSA 장비 기록·부품 담당으로 우수한 복무 성과. 부대 임무 수행에 기여.',
      'award.o6': '미합중국 육군부',
      'award.t9': '최우수 KATUSA상',
      'award.d9': '우수한 사격 성적을 기록했으며, KATUSA 동료들의 모범이 됨.',
      'award.o7': '미 8군 한미군지원단',
      'award.t10': '튜링 보안 아이디어 공모전 1등',
      'award.d10': 'Lamport 서명과 Merkle 트리를 결합한 하이브리드 양자내성 서명 제안. 독창성, 암호학적 타당성, 실현 가능성 평가를 거쳐 선정.',
      'award.t11': '특화 프로젝트 장학금',
      'award.d11': 'AI 보안 분야 연구 참여와 고품질 프로젝트 수행을 인정받아 수여.',
      'award.t12': '입학 장학금',
      'award.d12': '학업 우수와 리더십 잠재력을 인정받아 수여.',
      'award.o8': '단국대학교',
      'patent.meta': '한국 특허 출원 제10-2025-0098855호 <em>(출원)</em>',
      'proj.link': 'GitHub →',
      'proj.1.title': 'Split-Kyber for ARM TrustZone-A',
      'proj.1.tag': '비밀 분리 PQC · 사이버 보안 경진대회 1등',
      'proj.1.desc': 'ARM TrustZone-A에서 CRYSTALS-Kyber(ML-KEM)의 분할 실행 프레임워크를 구현했습니다. 비밀 연산은 Secure World(TEE)에서만 수행되어 키 격리를 보장하며, TCB를 최소화하면서도 성능을 유지합니다.',
      'proj.2.title': 'LV.0: LLM Vulnerability Zero',
      'proj.2.tag': 'LLM 기반 보안 취약점 자동 보고',
      'proj.2.desc': '오픈소스 취약점을 자동으로 분석하고 보고하는 프레임워크를 개발했습니다. GitHub 워크플로우 자동화와 NLP 기반 위험 요약을 적용했으며, Flask·FastAPI 백엔드 및 AI 모듈 설계를 주도했습니다.',
      'proj.3.title': 'ASX: Android API 시퀀스 추출기',
      'proj.3.tag': '정적 분석 · Electron GUI',
      'proj.3.desc': 'DEX 파일에서 API 수준 호출 시퀀스를 추출하는 정적 분석 파이프라인을 설계했습니다. 다중 인스턴스 학습(MIL)용 전처리 로직을 구현했으며, 크로스플랫폼 Electron GUI 도구로 개발했습니다.',
      'proj.4.title': 'Qrust: 보안 QR 및 AI 피싱 탐지',
      'proj.4.tag': '캡스톤 · 관객상',
      'proj.4.desc': 'ML 분류기를 활용한 보안 QR 생성 및 모바일 피싱 탐지 시스템을 개발했습니다. HMAC 서명 QR 검증과 Flask 기반 악성 URL 탐지 API를 구현했으며, 스캔→검증→위험 점수 산출의 end-to-end 보안 워크플로우를 구성했습니다.',
      'proj.5.title': '현대 아반떼(CN7) 디지털 포렌식 도구',
      'proj.5.tag': 'IVI 포렌식 · 로그 기반 이벤트 재구성',
      'proj.5.desc': 'Android 기반 IVI(차량용 인포테인먼트) 시스템을 위한 포렌식 추출 및 로그 기반 이벤트 재구성 시스템을 개발했습니다. 차량 로그 파싱과 시각화를 자동화했으며, 현대 차량 플랫폼 분석을 위한 연구자용 도구로 설계했습니다.',
      'proj.6.title': '양자내성 서명 시스템',
      'proj.6.tag': 'Lamport + Merkle 트리 · 튜링 보안 아이디어 공모전 1등',
      'proj.6.desc': 'Lamport OTS와 Merkle 트리 집계를 결합한 하이브리드 양자내성 서명 시스템을 구현했습니다. Python 프로토타입으로 서명·검증·일회용 키 관리 절차를 구현했습니다.',
      'proj.7.title': 'AI 문서 요약 웹 애플리케이션',
      'proj.7.tag': 'FastAPI · Claude API · Docker',
      'proj.7.desc': 'FastAPI 기반 백엔드 API로 사용자 인증과 프로젝트 관리를 구현했습니다. PDF/TXT 업로드 및 Claude API 연동 문서 요약, Swagger UI/ReDoc 문서화, SQLite 저장, Docker 배포를 제공합니다.',
      'proj.8.title': '또박 — LLM 기반 말·청각 지원 앱',
      'proj.8.tag': 'Flutter · 단국 스타트업 해커톤 3등',
      'proj.8.desc': '청각 장애인을 위한 LLM 기반 발음 교정 앱을 개발했습니다. UI/UX 설계와 기획을 주도했으며, AI 피드백이 연동된 Flutter 프로토타입을 구현했습니다.',
      'proj.9.title': '스마트 온실 AI',
      'proj.9.tag': 'CNN · 전이학습 · IoT ML',
      'proj.9.desc': '농업 분야 해충 탐지를 위한 CNN 분류기를 학습했습니다. 이미지 증강과 전이학습을 적용해 견고성을 높였으며, Google Colab 기반의 IoT 대응 ML 파이프라인을 구성했습니다.',
      'proj.10.title': 'Selenium 웹 크롤러',
      'proj.10.tag': '자동화 · LLM 연구용 데이터셋',
      'proj.10.desc': '제품 리뷰를 스크래핑해 LLM 연구용 데이터셋을 생성하는 자동화 스크립트를 개발했습니다. Selenium으로 DOM을 탐색하고 텍스트를 추출·정제하는 파이프라인을 구현했습니다.',
      'contact.phone': '전화:',
      'contact.location': '거주지:',
      'contact.email': '이메일',
      'contact.cv': '이력서 다운로드 (PDF)',
      'footer.copyright': '© 2025 노경민. All rights reserved.'
    }
  };

  function applyLang(lang) {
    var t = translations[lang] || translations.en;
    document.documentElement.lang = lang === 'ko' ? 'ko' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key]) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (t[key]) el.innerHTML = t[key];
    });
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
  }

  function initLang() {
    var saved = localStorage.getItem(LANG_KEY);
    var lang = (saved === 'en' || saved === 'ko') ? saved : 'en';
    localStorage.setItem(LANG_KEY, lang);
    applyLang(lang);
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var l = btn.getAttribute('data-lang');
        localStorage.setItem(LANG_KEY, l);
        applyLang(l);
      });
    });
  }

  initLang();

  // 테마: 저장된 값 또는 시스템 선호도, 없으면 다크
  function getPreferredTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : '');
    localStorage.setItem(THEME_KEY, theme);
  }

  function initTheme() {
    setTheme(getPreferredTheme());
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        setTheme(current === 'dark' ? 'light' : 'dark');
      });
    }
  }

  initTheme();

  // 모바일 메뉴
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 스크롤 시 섹션 등장
  var sections = document.querySelectorAll('.section');

  function checkVisible() {
    var windowHeight = window.innerHeight;
    var revealPoint = 120;

    sections.forEach(function (section) {
      var top = section.getBoundingClientRect().top;
      if (top < windowHeight - revealPoint) {
        section.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkVisible);
  window.addEventListener('load', checkVisible);
  checkVisible();

  // 헤더: 스크롤 시 배경 강조 + 내리면 숨기고 리모컨 표시
  var header = document.querySelector('.header');
  var pageRemote = document.querySelector('.page-remote');
  var sectionIds = ['home', 'about', 'education', 'work', 'publications', 'awards', 'patent', 'projects', 'contact'];
  var remoteThreshold = 320;

  function updateHeaderAndRemote() {
    var y = window.scrollY || window.pageYOffset;
    if (header) {
      header.classList.toggle('scrolled', y > 60);
      header.classList.toggle('remote-mode', y > remoteThreshold);
    }
    if (pageRemote) pageRemote.classList.toggle('visible', y > remoteThreshold);

    // 현재 보이는 섹션에 해당하는 리모컨 점에 .active
    if (pageRemote) {
      var currentId = null;
      var viewportMid = window.innerHeight * 0.35;
      for (var i = 0; i < sectionIds.length; i++) {
        var el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        var top = el.getBoundingClientRect().top;
        if (top <= viewportMid) currentId = sectionIds[i];
      }
      if (!currentId) currentId = 'home';
      pageRemote.querySelectorAll('.remote-dot').forEach(function (dot) {
        dot.classList.toggle('active', dot.getAttribute('data-section') === currentId);
      });
    }
  }

  if (header || pageRemote) {
    window.addEventListener('scroll', updateHeaderAndRemote);
    window.addEventListener('load', updateHeaderAndRemote);
    updateHeaderAndRemote();
  }

  // 그리드 칸 호버: 스크롤해도 배경 그리드와 맞게, 커서 있는 칸만 살짝 어두워짐
  var gridOverlay = document.getElementById('grid-hover-overlay');
  if (gridOverlay) {
    var cellSize = 32;

    function getDocSize() {
      var w = document.documentElement.scrollWidth || document.body.scrollWidth || window.innerWidth;
      var h = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.offsetHeight
      );
      return { w: w, h: h };
    }

    function buildGrid() {
      var size = getDocSize();
      var cols = Math.ceil(size.w / cellSize) + 1;
      var rows = Math.ceil(size.h / cellSize) + 1;
      gridOverlay.style.setProperty('--grid-cols', cols);
      gridOverlay.style.setProperty('--grid-rows', rows);
      gridOverlay.style.height = size.h + 'px';
      gridOverlay.innerHTML = '';
      for (var i = 0; i < cols * rows; i++) {
        var cell = document.createElement('div');
        cell.className = 'grid-hover-cell';
        cell.setAttribute('data-index', i);
        gridOverlay.appendChild(cell);
      }
      return { cols: cols, rows: rows };
    }

    var gridState = buildGrid();
    var cols = gridState.cols;
    var rows = gridState.rows;
    var currentHoveredCells = [];
    var radius = 2; // 5x5 스포트라이트

    function updateGridHover(pageX, pageY) {
      var col = Math.floor(pageX / cellSize);
      var row = Math.floor(pageY / cellSize);

      // 이전에 칠한 칸들 클래스 제거
      for (var i = 0; i < currentHoveredCells.length; i++) {
        currentHoveredCells[i].className = 'grid-hover-cell';
      }
      currentHoveredCells.length = 0;

      // 5x5 범위에서 거리(링)별로 칸에 클래스 부여
      for (var dr = -radius; dr <= radius; dr++) {
        for (var dc = -radius; dc <= radius; dc++) {
          var c = col + dc;
          var r = row + dr;
          if (c < 0 || c >= cols || r < 0 || r >= rows) continue;
          var ring = Math.max(Math.abs(dc), Math.abs(dr));
          var idx = r * cols + c;
          var cell = gridOverlay.querySelector('.grid-hover-cell[data-index="' + idx + '"]');
          if (cell) {
            cell.classList.add('hover-ring-' + ring);
            currentHoveredCells.push(cell);
          }
        }
      }
    }

    function clearGridHover() {
      for (var i = 0; i < currentHoveredCells.length; i++) {
        currentHoveredCells[i].className = 'grid-hover-cell';
      }
      currentHoveredCells.length = 0;
    }

    document.addEventListener('mousemove', function (e) {
      var pageX = e.clientX + (window.scrollX || window.pageXOffset);
      var pageY = e.clientY + (window.scrollY || window.pageYOffset);
      updateGridHover(pageX, pageY);
    });

    document.addEventListener('mouseleave', function () {
      clearGridHover();
    });

    window.addEventListener('resize', function () {
      gridState = buildGrid();
      cols = gridState.cols;
      rows = gridState.rows;
    });
  }
})();
