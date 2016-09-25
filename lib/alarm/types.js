exports['18'] = 'Lock Button';
exports['19'] = 'Code Unlock';  // 0 = user 1
exports['21'] = 'Manual Lock';  // 1 = thumb turn, 2 = outside pad
exports['22'] = 'Manual Unlock';
exports['24'] = 'Software Lock';
exports['25'] = 'Software Unlock';




/*

Alarm Reports Alarm Type Alarm Level Description

Master Code Changed or User Added
0x70 Master code was changed at keypad.
0x(00 - F9) Alarm level indicates user slot # where slot #0 is Master Code location. Additional users occupy slots 1-249.

Tamper Alarm
0xA1
0x01 Keypad attempts exceed code entry limit
0x02 Front escutcheon removed from main

Manual Unlock
0x16
0x01 By key cylinder or inside thumb turn

RF Operate Unlock
0x19
0x01 by RF module

Manual Lock
0x15
0x01 By key cylinder or inside thumb turn
0x02 By touch function (lock and leave)

RF Operate Lock
0x18
0x01 By RF module

Keypad Lock
0x12
0x(00 - F9) Where Alarm level represents user slot number

Keypad Unlock
0x13
0x(00 - F9) Where Alarm level represents user slot number

Deadbolt Jammed
0x09
0x00 Deadbolt motor jammed

Low Battery Alarms
0xA9 Too low to operate
0xA8 Critical Battery Level
0xA7 Low Battery
0x01

Auto Lock Operate Locked
0x1B
0x01 Auto re-lock cycle complete, locked

Duplicate Pin-code error
0x71
0x(00 - F9) Where Alarm level represents user slot number. Alarm is generated if code specified in User_Code_Set command already exists in the lock’s list of codes.

RF Module Power Cycled
0x82
0x01 Power to RF M was restored, sent by RF module

User Deleted
0x21
0x(01 - F9) Alarm Level refers to user number

 */