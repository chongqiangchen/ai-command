## AI COMMAND QUESTION

### How to use?

1. Install Command
```
npm install ai-command
```

2. Ask Command Question
```
// Input
aim ask "How to query port 3000, and close it"

// Output
lsof -i:3000 | kill -9 {PID}
```