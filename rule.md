# ⛔ AI Agent Constraints - DO NOT VIOLATE

## Critical Rules: Project Structure Preservation

When completing any task, you MUST follow these STRICT rules:

---

## 🚫 NEVER DO (Absolute Prohibitions)

### 1. Project Structure Changes
- ❌ DO NOT change existing folder structure
- ❌ DO NOT rename files unless explicitly requested
- ❌ DO NOT rename folders unless explicitly requested
- ❌ DO NOT move files between directories without permission
- ❌ DO NOT reorganize the project architecture

### 2. Code Architecture Changes
- ❌ DO NOT refactor the entire codebase
- ❌ DO NOT change component architecture (e.g., don't convert class components to functional)
- ❌ DO NOT change state management pattern (Redux/Context/Zustand)
- ❌ DO NOT change routing structure
- ❌ DO NOT modify the API endpoint structure

### 3. Dependencies & Tech Stack
- ❌ DO NOT change the tech stack (React, Next.js, Vue, etc.)
- ❌ DO NOT add major new dependencies without explicit approval
- ❌ DO NOT remove existing dependencies
- ❌ DO NOT upgrade/downgrade major package versions
- ❌ DO NOT change build tools (Webpack, Vite, etc.)

### 4. Database & Schema
- ❌ DO NOT modify database schema unless explicitly requested
- ❌ DO NOT change field names in database
- ❌ DO NOT remove existing tables/models
- ❌ DO NOT change relationships between models

### 5. Configuration Files
- ❌ DO NOT modify `package.json` scripts unless requested
- ❌ DO NOT change ESLint/Prettier configuration
- ❌ DO NOT modify `tsconfig.json` / `jsconfig.json`
- ❌ DO NOT change environment variable structure in `.env.example`

---

## ✅ ALLOWED ACTIONS (What You Can Do)

### 1. Minimal Code Changes
- ✅ Fix bugs in existing files
- ✅ Add new logic to existing functions/components
- ✅ Update existing component props
- ✅ Add conditional rendering logic
- ✅ Fix TypeScript/JavaScript errors

### 2. Targeted Additions
- ✅ Create NEW files if needed (but keep in appropriate existing folders)
- ✅ Add new utility functions in existing utility files
- ✅ Add new API routes following existing pattern
- ✅ Add new components in existing component folders

### 3. Safe Updates
- ✅ Update component state logic
- ✅ Add new CSS classes (without removing existing ones)
- ✅ Add new API calls following existing patterns
- ✅ Update UI text/content
- ✅ Add new validation logic

---

## 📋 Required Workflow

When given a task, you MUST:

1. **Analyze First**
   - Identify EXACTLY which files need changes
   - Determine if changes can be made WITHOUT restructuring
   - If restructuring is needed → ASK for permission first

2. **Minimal Changes Only**
   - Make the SMALLEST possible change to fix the issue
   - Touch as FEW files as possible
   - Preserve all existing functionality

3. **Follow Existing Patterns**
   - Use the same coding style as existing code
   - Follow the same naming conventions
   - Use the same import/export patterns
   - Match the existing file organization

4. **Document Changes**
   - List EXACTLY which files were modified
   - Explain WHAT was changed and WHY
   - Note any side effects or dependencies

---

## 🔍 Before Making Changes - Checklist

Ask yourself these questions:

- [ ] Am I changing more than 3 files?
- [ ] Am I renaming any files or folders?
- [ ] Am I adding a new dependency?
- [ ] Am I changing the component hierarchy?
- [ ] Am I modifying the database schema?
- [ ] Am I changing configuration files?
- [ ] Am I refactoring code that works?

**If you answered YES to any of these → STOP and ask for permission first!**

---

## 💡 Examples

### ❌ WRONG Approach
```
Task: Fix video upload bug

AI Response:
- Renamed VideoUploadComponent.tsx → VideoUpload.tsx
- Moved all upload logic to new /services/upload folder
- Refactored to use React Query instead of useState
- Added Zustand for state management
- Restructured component props interface
```
**Problem:** Too many structural changes for a simple bug fix!

### ✅ CORRECT Approach
```
Task: Fix video upload bug

AI Response:
- Modified VideoUploadComponent.tsx line 45-52
- Added null check before accessing video.url
- Fixed: if (!video?.url) return null;
  
Files changed: 1
Lines changed: 3
```
**Good:** Minimal, targeted fix without restructuring!

---

## 🚨 Emergency Exception Protocol

If you ABSOLUTELY MUST break these rules to complete a task:

1. **STOP immediately**
2. **Explain to the user:**
   - Why the current structure prevents the fix
   - What changes are absolutely necessary
   - What risks/impacts these changes have
3. **Wait for explicit approval** before proceeding
4. **Provide alternative solutions** that don't require restructuring

---

## 📝 Response Template

When completing a task, format your response like this:

```markdown
## Changes Made

### Files Modified
1. `src/components/LessonList.tsx` - Line 123-145
   - Added conditional check for testCases
   - Reason: Hide video upload for TestCode lessons

2. `src/components/VideoLessonComponent.tsx` - Line 67-70
   - Added guard clause
   - Reason: Prevent rendering for TestCode lessons

### Files Created
- None

### Dependencies Added
- None

### Database Changes
- None

### Configuration Changes
- None

✅ All changes follow existing patterns
✅ No structural changes made
✅ Minimal impact on codebase
```

---

## 🎯 Summary

**Your primary directive:**
> Make the MINIMUM necessary changes to complete the task while preserving ALL existing structure, patterns, and architecture.

**When in doubt:**
> Ask first, change later.

**Remember:**
> Working code that follows existing patterns > "Better" code that breaks everything.

---

## 🔒 These Rules Are Non-Negotiable

These constraints exist to:
- Prevent breaking existing functionality
- Maintain code consistency
- Reduce debugging time
- Ensure team collaboration
- Preserve project stability

**Violating these rules may result in:**
- Breaking production code
- Merge conflicts
- Lost development time
- Team frustration
- Rejected pull requests

---

**Last Updated:** 2025-11-29
**Applies To:** All AI agents working on this project