# Folder Structure

```bash
src
├── controllers
│   ├── Authcontroller.ts
│   ├── InterviewController.ts
│   ├── QuestionController.ts
│   ├── SubmissionController.ts
│   └── UserController.ts
├── environments
│   ├── dev.env.ts
│   ├── env.ts
│   └── prod.env.ts
├── index.ts
├── middlewares
│   └── ContactEmail.ts
├── models
│   ├── Interview.ts
│   ├── Question.ts
│   ├── submissions.ts
│   └── User.ts
├── routers
│   ├── AuthRouter.ts
│   ├── InterviewRouter.ts
│   ├── QuestionRouter.ts
│   ├── SubmissionRouter.ts
│   └── UserRouter.ts
└── server.ts
```

# API Docs

#### Available APIS Routes

1. /user 
    - /user/
    ```json
    Request Type: GET
    Response Type: {
        data: null | user
        success: boolean
    }
    ```

    - /user/
    ```json
    Request Type: POST
    Response Type: {
        data: user
        success: boolean
    }
    ```

    - /user/
    ```json
    Request Type: PUT
    Response Type: {
        data: user
        success: boolean
    }
    ```

2. /question 
    - /question/
    ```json
    Request Type: GET
    Response Type: {
        data: question[]
        success: boolean
    }
    ```

    - /question/data
    ```json
    Request Type: GET
    Response Type: {
        data: null | question
        success: boolean
    }
    ```

    - /question/
    ```json
    Request Type: POST
    Response Type: {
        data: question
        success: boolean
    }
    ```

    - /question/tags
    ```json
    Request Type: POST
    Response Type: {
        data: question[]
        success: boolean
    }
    ```

    - /question/
    ```json
    Request Type: PUT
    Response Type: {
        data: question
        success: boolean
    }
    ```

3. /auth
    - /auth/signin
    ```json
    Request Type: POST
    Response Type: {
        data: null | {
            formData: user,
            token
        }
        success: boolean
    }
    ```

    - /auth/signup
    ```json
    Request Type: POST
    Response Type: {
        data: null | {
            formData: user,
            token
        }
        success: boolean
    }
    ```

4. /interview
    - /interview/
    ```json
    Request Type: GET
    Response Type: {
        data: null | interview
        success: boolean
    }
    ```

    - /interview/
    ```json
    Request Type: POST
    Response Type: {
        data: interview
        success: boolean
    }
    ```

    - /interview/email
    ```json
    Request Type: POST
    Response Type: {
        data: message (email content)
        success: boolean
    }
    ```

    - /interview/:id
    ```json
    Request Type: DELETE
    Response Type: {
        success: boolean
    }
    ```

5. /submission
    - /submission/:user
    ```json
    Request Type: GET
    Response Type: {
        data: submission
        success: boolean
    }
    ```

    - /submission/:user
    ```json
    Request Type: GET
    Response Type: {
        data: submission
        success: boolean
    }
    ```

    - /submission/
    ```json
    Request Type: POST
    Response Type: {
        data: submission
        success: boolean
    }
    ```

#### Available Schema

1. User
    - UserName: string
    - Image: string
    - Password: string
    - Email: string
    - Name: string
    - Institute: string
    - Country: string
    - State: string
    - City: string
    - questionsCreated: string[]
    - questionsSolved: string[]

2. Question
    - QuestionID: string
    - ProblemStatement: string
    - Input: string
    - Output: string
    - Constraints: string
    - SampleInput: string
    - SampleOutput: string
    - Explanation: string
    - Creator: string
    - Tags: string[]
    - TimeLimit: string
    - MemoryLimit: number
    - TestCases: []
        - Input: string
        - Output: string

3. Interview
    - RoomId: string
    - InterviewerEmail: string
    - IntervieweeEmail: string
    - Duration: number
    - StartTime: string
    - Questions: string[]

4. Submission
    - QuestionID: string
    - Creator: string
    - Code: string
    - Language: string
    - Status: string