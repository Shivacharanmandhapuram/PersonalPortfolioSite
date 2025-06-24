# AI Troubleshooting Guide for Portfolio Website

## How to Effectively Communicate Issues to AI

When you encounter problems with your portfolio website, use these structured prompts to get the best help from AI assistants.

## General Issue Template





```
**Issue Type**: [Frontend/Backend/Build/Deployment/Performance]
**Priority**: [High/Medium/Low]
**Environment**: [Development/Production]

**Problem Description**:
[Clear, concise description of what's wrong]

**Expected Behavior**:
[What should happen]

**Actual Behavior**:
[What actually happens]

**Steps to Reproduce**:
1. [First step]
2. [Second step]
3. [Result]

**Error Messages**:
```
[Paste exact error message here]
```

**Browser/Environment**:
- Browser: [Chrome 120, Safari 17, etc.]
- Device: [Desktop/Mobile/Tablet]
- OS: [macOS/Windows/iOS/Android]

**Recent Changes**:
[Any recent code changes or updates]
```

## Specific Issue Categories

### 1. RSS Feed / Blog Posts Not Loading

```
The Substack RSS feed is not loading or showing outdated content in the Playbook section.

**Current Symptoms**:
- [ ] No posts showing (only fallback content)
- [ ] Old posts showing instead of new ones
- [ ] Refresh button not working
- [ ] Error in browser console

**Debugging Information**:
- Substack URL: https://shivacharanmandhapuram.substack.com/feed
- Last working time: [When it last worked]
- New posts published: [When new content was added]

**Browser Console Errors**:
```
[Paste any console errors here]
```

**API Response Check**:
Test this URL directly: https://your-site.com/api/playbook-feed
Response: [Paste response or error]
```

### 2. Responsive Design Issues

```
The website layout is broken on [device type].

**Affected Sections**:
- [ ] Navigation
- [ ] About page hero
- [ ] Experience timeline
- [ ] Playbook blog posts
- [ ] Other: _______

**Device Information**:
- Screen size: [e.g., iPhone 14, iPad Pro, 1920x1080 desktop]
- Browser: [Safari, Chrome, etc.]
- Orientation: [Portrait/Landscape]

**Visual Description**:
[Describe how it looks vs how it should look]

**Screenshots**: [If possible, describe what you see]
```

### 3. Build or Development Server Issues

```
The development server won't start or build is failing.

**Command Used**:
```
[e.g., npm run dev, npm run build]
```

**Complete Error Output**:
```
[Paste full terminal output here]
```

**Recent Changes**:
- Package installations: [Any new packages]
- File modifications: [Which files were changed]
- Environment variables: [Any changes to .env or secrets]

**Environment**:
- Node.js version: [Run: node --version]
- NPM version: [Run: npm --version]
- Operating system: [macOS, Windows, Linux]
```

### 4. Performance Issues

```
The website is loading slowly or has performance problems.

**Performance Metrics**:
- Page load time: [How long it takes]
- Specific slow sections: [Navigation, images, blog posts, etc.]
- Network conditions: [WiFi, mobile data, etc.]

**Browser Performance Tab Data**:
[If available, share key metrics from browser dev tools]

**Affected Pages**:
- [ ] About (homepage)
- [ ] Experience
- [ ] Interests  
- [ ] Playbook
- [ ] All pages

**When It Started**:
[Recent changes or when you first noticed]
```

### 5. Deployment Issues

```
The website isn't deploying correctly or has issues in production.

**Deployment Platform**: [Replit/Vercel/Netlify/Other]

**Error Type**:
- [ ] Build failing
- [ ] Deploy succeeding but site not working
- [ ] Environment variables missing
- [ ] Database connection issues

**Build Logs**:
```
[Paste relevant build/deploy logs]
```

**Production URL**: [Your deployed site URL]
**Last Successful Deploy**: [When it last worked]
```

## Advanced Debugging Prompts

### For Code-Level Issues

```
I'm getting a TypeScript/JavaScript error in the portfolio website.

**File**: [e.g., client/src/pages/Playbook.tsx]
**Line Number**: [If known]

**Error Message**:
```
[Exact error from IDE or browser]
```

**Code Context**:
```typescript
// Paste the relevant code section here
// Include a few lines before and after the error
```

**What I Was Trying To Do**:
[Describe the feature or change you were implementing]

**Related Files**:
[Any other files that might be involved]
```

### For API/Backend Issues

```
The API endpoint is not working correctly.

**Endpoint**: [e.g., GET /api/playbook-feed]
**Expected Response**: [What should be returned]
**Actual Response**: [What you're getting]

**Test Command**:
```bash
curl -X GET "http://localhost:5000/api/playbook-feed?page=1&limit=6"
```

**Response**:
```json
[Paste actual API response]
```

**Server Logs**:
```
[Paste relevant server console output]
```
```

## Quick Fix Requests

### For Simple Changes

```
Please help me [specific task] in the portfolio website.

**What I Want to Change**:
[Clear description of desired change]

**Current Behavior**:
[How it works now]

**Desired Behavior**:
[How you want it to work]

**Affected Files** (if known):
[Any specific files you think need changes]

**Design Requirements**:
[Any specific design or styling needs]
```

### For Feature Additions

```
I want to add [new feature] to the portfolio website.

**Feature Description**:
[Detailed description of what you want]

**Where It Should Go**:
[Which page or section]

**Functional Requirements**:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

**Design Requirements**:
- Should match existing design
- Responsive for all devices
- [Any specific styling needs]

**Technical Considerations**:
[Any specific technical requirements or constraints]
```

## Emergency Situations

### Site Completely Down

```
URGENT: The portfolio website is completely down.

**Current Status**:
- [ ] Site not loading at all
- [ ] 500 server error
- [ ] 404 not found
- [ ] Loading but broken

**Production URL**: [Your site URL]
**Error Message**: [What visitors see]

**Recent Changes**:
[Any deployments or changes in last 24 hours]

**Time of Issue**: [When you first noticed]

**Impact**: [Who is affected - visitors, specific pages, etc.]
```

## Best Practices for AI Communication

### DO:
- Provide exact error messages
- Include relevant code snippets
- Mention recent changes
- Test in multiple browsers when possible
- Check both development and production environments

### DON'T:
- Say "it's broken" without specifics
- Skip error messages or logs
- Assume the AI knows your recent changes
- Mix multiple unrelated issues in one request

## Common Solutions to Try First

Before asking for help, try these quick fixes:

### 1. Cache and Refresh Issues
```bash
# Clear browser cache or try incognito mode
# Use the refresh button in Playbook section
# Restart development server
npm run dev
```

### 2. RSS Feed Problems
```bash
# Test the RSS feed directly
curl "https://shivacharanmandhapuram.substack.com/feed"

# Check API endpoint
curl "http://localhost:5000/api/playbook-feed"
```

### 3. Build Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf dist
npm run build
```

### 4. TypeScript Errors
```bash
# Check TypeScript compilation
npx tsc --noEmit

# Restart TypeScript server in IDE
# CMD+Shift+P > "TypeScript: Restart TS Server"
```

## Useful Commands for Debugging

```bash
# Check current status
npm run dev

# Test API endpoints
curl "http://localhost:5000/api/playbook-feed?page=1"

# Check build output
npm run build

# View server logs
# (Look at terminal where npm run dev is running)

# Check package versions
npm list

# Verify environment
node --version
npm --version
```

## Project-Specific Context

When asking for help, mention you're working with:
- **Portfolio Website**: Advait Paliwal's personal site
- **Tech Stack**: React + TypeScript + Express + Tailwind CSS
- **Key Features**: Substack RSS integration, infinite scroll, responsive design
- **Documentation**: Reference TECHNICAL_DOCUMENTATION.md and CODE_STRUCTURE.md

This context helps AI understand your specific setup and provide more targeted solutions.