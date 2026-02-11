(function () {
  'use strict';

  var THEME_KEY = 'portfolio-theme';
  var LANG_KEY = 'portfolio-lang';

  var translations = {
    en: {
      'nav.about': 'About',
      'nav.education': 'Education',
      'nav.experience': 'Experience',
      'nav.publications': 'Publications',
      'nav.awards': 'Awards',
      'nav.patent': 'Patent',
      'nav.projects': 'Projects',
      'nav.contact': 'Contact',
      'hero.label': "Hello, I'm",
      'hero.title1': 'Kyoungmin Roh,',
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
      'nav.about': '소개',
      'nav.education': '학력',
      'nav.experience': '경력',
      'nav.publications': '논문',
      'nav.awards': '수상',
      'nav.patent': '특허',
      'nav.projects': '프로젝트',
      'nav.contact': '연락처',
      'hero.label': '안녕하세요,',
      'hero.title1': '저는 노경민,',
      'hero.title2': '사이버보안 연구자입니다.',
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
      'about.objectiveText': '사이버보안 분야의 교수로서 학계에 기여하며, 영향력 있는 연구와 교육을 통해 사회에 기여하고자 합니다. 보안과 사람들의 삶을 향상시키는 기술을 개발하고, 제 한계를 넘어서 발전할 다음 세대 연구자를 멘토링하는 것을 목표로 합니다.',
      'about.interestsTitle': '연구 관심사',
      'about.interestsText': '진화하는 위협과 깨진 가정 하에서도 안정적으로 동작해야 하는 복잡한 시스템의 보안에 관심이 있습니다. 현재 연구는 CPS 및 시스템 보안에 집중하며, 개념 드리프트 하의 학습 기반 침입 탐지(IDS)와 CPS·임베디드 시스템에서의 양자내성암호(PQC) 안전 배포를 다룹니다. 시간·환경·양자시대 전환기에도 신뢰할 수 있는 보안 시스템 설계의 원칙적 기반을 구축하는 것이 연구 목표입니다.',
      'edu.degree': '사이버보안 학사',
      'edu.meta': '2021년 3월 – 2027년 1월 졸업 예정 · 용인, 대한민국',
      'edu.li1': '학부 (3학년 → 4학년)',
      'edu.li2': 'GPA: 3.0 / 4.5',
      'edu.li3': '관련 과목: 인공지능 보안, CPS 보안, 임베디드 보안, 암호학',
      'work.labLink': '랩 홈페이지 →',
      'work.position': '직위: 연구 인턴',
      'work.iuOrg': '컴퓨터과학과, 인디애나 대학교 블루밍턴',
      'work.iuPeriod': '기간: 2025년 10월 – 현재 · 미국 블루밍턴',
      'work.iu1': '오픈소스 CPS 소프트웨어의 보안 위험 및 고장 모드 분석',
      'work.iu2': '장수 CPS의 취약점 패턴 및 공격 표면 조사',
      'work.iu3': 'OSV, GitHub Issues, 포럼을 활용한 CPS 관련 취약점 조사',
      'work.iu4': 'CPS 특화 취약점 특성화 개발',
      'work.csosOrg': '소프트웨어학과, 단국대학교',
      'work.csosPeriod': '기간: 2025년 3월 – 현재 · 용인, 대한민국',
      'work.csos1': '재학습 없이 심한 개념 드리프트 하의 학습 기반 IDS 연구',
      'work.csos2': 'API 동시출현 및 SNA를 이용한 그래프 기반 IDS 연구',
      'work.csos3': 'ARM TrustZone 기반 TEE 경량 PQC 배포 연구',
      'work.csos4': 'Android 침입 탐지 시스템(IDS) 공동 연구: <strong>일리노이 주립대 (지도교수: 한효일 교수님, 서경원 교수님)</strong>',
      'work.csos5': '자동차 CPS 보안 공동 연구: <strong>서울대 SORLab (지도교수: 서지원 교수님, Martin Kayondo 박사님)</strong>',
      'work.katusaTitle': 'KATUSA (한미 연합군 한국군 보강)',
      'work.kaOrg': '미 8군, 캠프 캐럴, 제35방공포병여단, 2-1 방공포대대,  Echo 중대 · 왜관, 대한민국',
      'work.ka1': '한미 합동 작전 시 통역병으로 활동함',
      'work.ka2': '환경 검사원으로 임명되었으며, 군 규정에 따른 환경·작전 안전 점검을 수행함',
      'work.ka3': '미군 준장으로부터 <em>육군 공로 훈장(ARCOM)</em> 수훈',
      'work.ka4': '<em>최우수 카투사상</em> 및 <em>최우수 전투 분대상</em>을 수상함',
      'pub.catSCI': 'SCI Journals',
      'pub.catDomestic': 'Domestic Journals',
      'pub.catIntl': 'International Conferences',
      'pub.catDomConf': 'Domestic Conferences',
      'pub.catThesis': 'Thesis',
      'pub.catOther': 'Other Research Papers',
      'pub.viewPaper': '논문 보기 →',
      'pub.viewCert': '상장 보기 →',
      'award.t1': '특성화 장학금',
      'award.d1': '학술 수상 실적 및 고품질 프로젝트 수행으로 수여; AI 보안 연구 우수성 인정.',
      'award.o1': '단국대학교 사이버보안학과',
      'award.t2': '학술 연구 장학금',
      'award.d2': '학부생으로 국내 주요 학회 논문 게재; 연구 잠재력 및 학술 우수성으로 수여.',
      'award.o2': '단국대학교 SW중심사업단',
      'award.t3': '사이버 보안 경진대회 1등상',
      'award.d3': '"ARM TrustZone 기반 경량 비밀 분리형 양자내성 암호 아키텍처"; PQC Kyber의 비밀 분리 연산.',
      'award.t4': 'KSC 2025 최우수 논문상',
      'award.d4': '"재학습 없는 Android 악성코드 탐지를 위한 Louvain 커뮤니티 기반 드리프트 인식 보안 모듈"; 개념 드리프트 하 견고성·확장성 인정.',
      'award.o4': '한국정보과학회 (KIISE)',
      'award.t5': '캡스톤 페스티벌 관객상',
      'award.d5': 'Qrust: 보안 QR 및 AI 기반 피싱 탐지 시스템; HMAC 서명 QR 검증, ML 기반 악성 URL 탐지.',
      'award.t6': '단국 스타트업 해커톤 3등 (참가상)',
      'award.d6': 'LLM 기반 발음 교정 앱 <em>또박</em> 기획·개발 리드; AI 기반 보조 의료 설계로 인정.',
      'award.t7': 'WDSC 2025 최우수 논문상',
      'award.d7': 'API 동시출현 그래프와 Louvain 커뮤니티를 이용한 Android 악성코드 탐지; 개념 드리프트 하 견고성으로 선정.',
      'award.o5': 'KIISE',
      'award.t8': '육군 공로 훈장 (ARCOM)',
      'award.d8': 'KATUSA 장비 기록·부품 담당으로 우수 복무; 부대 임무 지원.',
      'award.o6': '미합중국 육군부',
      'award.t9': '최우수 카투사상',
      'award.d9': '우수한 사격 성적; KATUSA 동료들의 모범.',
      'award.o7': '미 8군 한국군지원단',
      'award.t10': '튜링 보안 아이디어 공모전 1등',
      'award.d10': 'Lamport 서명과 Merkle 트리를 결합한 하이브리드 양자내성 서명; 독창성·암호학적 타당성·실현 가능성 평가.',
      'award.t11': '특화 프로젝트 장학금',
      'award.d11': 'AI 보안 연구 initiative 및 고품질 프로젝트 수행으로 수여.',
      'award.t12': '입학 장학금',
      'award.d12': '학업 우수 및 리더십 잠재력으로 수여.',
      'award.o8': '단국대학교',
      'patent.meta': '한국 특허 출원 제10-2025-0098855호 <em>(출원)</em>',
      'proj.link': 'GitHub →',
      'proj.1.title': 'Split-Kyber for ARM TrustZone-A',
      'proj.1.tag': '비밀 분리 PQC · 사이버 보안 경진대회 1등',
      'proj.1.desc': 'ARM TrustZone-A에서 CRYSTALS-Kyber(ML-KEM) 분할 실행 프레임워크 구현. 비밀 연산은 Secure World(TEE)에서만 수행되어 엄격한 키 격리. TCB 최소화와 성능 유지.',
      'proj.2.title': 'LV.0: LLM Vulnerability Zero',
      'proj.2.tag': 'LLM 기반 보안 취약점 리포터',
      'proj.2.desc': '오픈소스 취약점 자동 분석·리포트 프레임워크. GitHub 워크플로우 자동화, NLP 기반 위험 요약. Flask·FastAPI 백엔드 및 AI 설계 리드.',
      'proj.3.title': 'ASX: Android API 시퀀스 추출기',
      'proj.3.tag': '정적 분석 · Electron GUI',
      'proj.3.desc': 'DEX에서 API 수준 호출 시퀀스를 추출하는 정적 분석 파이프라인. MIL 전처리 및 크로스플랫폼 Electron GUI 도구.',
      'proj.4.title': 'Qrust: 보안 QR 및 AI 피싱 탐지',
      'proj.4.tag': '캡스톤 · 관객상',
      'proj.4.desc': 'ML 분류기 기반 보안 QR 생성 및 모바일 피싱 탐지. HMAC 서명 QR, Flask 기반 악성 URL 탐지 API. 스캔→검증→위험 점수 워크플로우.',
      'proj.5.title': '현대 아반떼(CN7) 디지털 포렌식 도구',
      'proj.5.tag': 'IVI 포렌식 · 로그 기반 이벤트 재구성',
      'proj.5.desc': 'Android 기반 IVI용 포렌식 추출 및 로그 기반 이벤트 재구성. 차량 로그 파싱·시각화 자동화. 현대 차량 플랫폼 분석용.',
      'proj.6.title': '양자내성 서명 시스템',
      'proj.6.tag': 'Lamport + Merkle 트리 · 튜링 사이퍼 1등',
      'proj.6.desc': 'Lamport OTS와 Merkle 트리 집계를 결합한 하이브리드 양자내성 서명. Python 프로토타입: 서명·검증·일회용 키 관리.',
      'proj.7.title': 'AI 문서 요약 웹 애플리케이션',
      'proj.7.tag': 'FastAPI · Claude API · Docker',
      'proj.7.desc': 'FastAPI 백엔드: 인증·프로젝트 관리. PDF/TXT 업로드 및 Claude API 요약. Swagger/ReDoc, SQLite, Docker 배포.',
      'proj.8.title': '또박 — LLM 기반 말·청각 치료 앱',
      'proj.8.tag': 'Flutter · 단국 스타트업 해커톤 3등',
      'proj.8.desc': '청각 장애인 지원 LLM 발음 교정 앱. UI/UX 설계·기획 리드. Flutter 프로토타입과 AI 피드백 연동.',
      'proj.9.title': '스마트 온실 AI',
      'proj.9.tag': 'CNN · 전이학습 · IoT ML',
      'proj.9.desc': '농업 해충 탐지용 CNN 분류기. 이미지 증강·전이학습. Google Colab 기반 IoT ML 파이프라인.',
      'proj.10.title': 'Selenium 웹 크롤러',
      'proj.10.tag': '자동화 · LLM 연구용 데이터셋',
      'proj.10.desc': '제품 리뷰 스크래핑으로 LLM 연구용 데이터셋 생성. Selenium DOM 탐색 및 텍스트 추출·정제.',
      'contact.phone': '전화:',
      'contact.location': '거주지:',
      'contact.email': '이메일',
      'contact.cv': 'CV 다운로드 (PDF)',
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

  // 헤더 스크롤 시 배경 강조 (CSS 변수 사용)
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 60);
    });
  }
})();
