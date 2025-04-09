# Terminal JS 4.0

My fourth (yeah...) rewrite of this thing. Main motivation is to use it in the ETCODE competition if I can grind it fast enough.

Will hopefully utilize diff approaches than the broken stuff I thought works well in the past (it didn't lol)

### Checklist
- [X] Core functionality
  - [X] VM manager
  - [X] tasks 
- [X] Common base functions
  - [X] print
  - [X] input
  - [X] Terminal reset
- [ ] File system
  - [X] cmd function
  - [X] Virtual filesystem manager (mostly a class)
  - [ ] File actions
  - [X] Path parsing and manipulation
    - [ ] Base manipulation and path retrieval and comparison
    - [X] Flags and parameter parsing
  - [ ] Default commands
- [ ] Auth
  - [ ] Username/Login system/command
    - [ ] Utilizing hash comparison and verification this time
  - [ ] Authorization checks when needed


### Notes
- Positioning `helper.cmd` is tricky and may cause sync issues if not properly used. Use it only at the end.