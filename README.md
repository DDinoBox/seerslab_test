# 게시판

## 프로젝트 소개
게시판 서버는 사용자로부터 게시물을 생성, 조회, 수정, 삭제(CRUD)할 수 있는 기능을 제공합니다.
이 서버는 Express.js와 mysql을 기반으로 구축되었습니다.

## ERD
![ERD](https://blog.kakaocdn.net/dn/bstFPZ/btsHKddj5At/lVgQB4vUKmR9EnxtCljlV1/img.png)

## 설치 방법

### 1. 레포지토리 클론
```bash
git clone https://github.com/DDinoBox/seerslab_test_board_server.git
```
### 2. 의존성 패키지 설치
```bash
yarn install
```
### 3. .env 파일 생성 (예시)
```bash
DATABASE_URL= localhost

PORT= 8000

TYPEORM_CONNECTION= mysql
TYPEORM_HOST= localhost
TYPEORM_USERNAME= root
TYPEORM_PASSWORD= 비밀번호
TYPEORM_DATABASE= seerslab-test
TYPEORM_PORT= 3306
TYPEORM_LOGGING= BOOLEAN

JWT_ALGORITHM= HS256
JWT_EXPIRES_IN= 1d
JWT_SECRET_KEY= JWT_SECRET_KEY
```
