# TaskFlow

팀원들과 프로젝트별 할 일(Task)을 생성·관리하며, GitHub 브랜치 전략을 실전 연습할 수 있는 협업 웹 애플리케이션.

## 기술 스택

| 영역 | 기술 |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Backend | Spring Boot 3 + Java 17 |
| Database | PostgreSQL |
| Auth | Spring Security + JWT |
| 스타일링 | CSS Modules |

## 프로젝트 구조

```
TaskFlow/
├── frontend/    # React + Vite 프론트엔드
├── backend/     # Spring Boot 백엔드
├── .gitignore
└── README.md
```

## 실행 방법

### 사전 준비

- Node.js 18+
- Java 17+
- PostgreSQL 15+

### 데이터베이스 설정

```sql
CREATE DATABASE taskflow;
```

### 백엔드 실행

```bash
cd backend
./gradlew bootRun
```

서버가 `http://localhost:8080` 에서 실행됩니다.

### 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

개발 서버가 `http://localhost:5173` 에서 실행됩니다.

## 브랜치 전략

| 브랜치 | 용도 |
|---|---|
| `main` | 최종 안정 버전 |
| `develop` | 개발 통합 브랜치 |
| `feature/*` | 기능 개발 |
| `fix/*` | 버그 수정 |

### 브랜치 예시

- `feature/project-init` — 프로젝트 초기 세팅
- `feature/frontend-layout` — 공통 레이아웃
- `feature/auth-signup` — 회원가입
- `feature/auth-login` — 로그인
- `feature/project-crud` — 프로젝트 CRUD
- `feature/task-crud` — 할 일 CRUD
- `feature/task-status` — 할 일 상태 변경

## API 엔드포인트

### 인증

| Method | URL | 설명 |
|---|---|---|
| POST | `/api/auth/signup` | 회원가입 |
| POST | `/api/auth/login` | 로그인 |
| GET | `/api/auth/me` | 내 정보 조회 |

### 프로젝트

| Method | URL | 설명 |
|---|---|---|
| POST | `/api/projects` | 프로젝트 생성 |
| GET | `/api/projects` | 프로젝트 목록 |
| GET | `/api/projects/{id}` | 프로젝트 상세 |

### 할 일

| Method | URL | 설명 |
|---|---|---|
| POST | `/api/projects/{projectId}/tasks` | 할 일 생성 |
| GET | `/api/projects/{projectId}/tasks` | 할 일 목록 |
| PUT | `/api/tasks/{id}` | 할 일 수정 |
| PATCH | `/api/tasks/{id}/status` | 상태 변경 |
| DELETE | `/api/tasks/{id}` | 할 일 삭제 |
