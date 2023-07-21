export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFciLCJpYXQiOjE2ODk3ODkyNzd9.9u4QI0Rlxr4Rq3uYkEHpnZ0fBs4qVjZfrRFlCsagGRw'

export const authHeader = 'Bearer ' + token;

export const user = {
  id: 1,
  username: 'username',
  email: 'valid@email.com',
  role: 'not',
  password: 'validpassword',
}

export const payload = {
  email: 'valid@email.com',
  password: 'validpassword',
}

export const invalidEmail = {
  email: 'invalid_email',
  password: 'validpassword',
}

export const invalidPassword = {
  email: 'valid@email.com',
  password: 'invld',
}