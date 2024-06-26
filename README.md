## 간단한 매입, 판매 현황 및 매출 확인을 위한 프로젝트

### 개요

- 매입 매출 현황을 간단한 엑셀 파일 업로드를 통해서 쉽게 매출 현황을 파악하고
- 기타 거래처에 대한 데이터를 입력하여 확인을 용의하게 하기 위한 목적으로 제작한 프로젝트 입니다.

### 사용기술

- front : nextjs, react, materialUI, react-query, zustand
- backend : mongodb, nestjs
- devops & deploy
  - 실배포 : aws beanstalk, aws cloudfront, aws amplify, aws codepipeline
  - 테스트 배포 : vercel, heroku

### 주안점

- 최적화
  - nextjs 병렬 라우팅 기능을 이용한 무거운 데시보드를 섹터별 최적화
  - react-query 이용한 캐쉬기능 활용
- 편의성
  - 별도 백데이터 없이 기존 사용하던 엑셀 파일 업로드만 통해서 자동으로 백데이터 생성 및 현황 업데이트가 진행되도록 작성
  - 실무자가 실수했을 경우 롤백 할 수 있도록 뒤로가기 기능을 설정에 추가

### 향후추진

- excel 파일 업로드 시 유효성 검사가 제대로 이뤄지지 않는지 지속적으로 확인 조치(실무자 피드백)
- 편의성개선 : 대시보드 조회시 추가적인 날짜 선택, 이동 이 편하도록 UI 개전(~계속)
