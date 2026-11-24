---
kind: project
title: Automated Chessboard
summary: 'Mechatronics Lab final project: a CoreXY gantry under the board drags magnetized pieces with an electromagnet so you can play a physical game of chess against an Arduino.'
role: Team Leader
started: 2023-04
ended: 2023-05
status: completed
links:
  # site:
  repo: https://github.com/Ethan-Matlack/WU-AutomaticChessboard
  # paper:
tags: [Arduino, C++, Stepper Motors, CoreXY, CAD, 3D Printing]
# cover:
# coverAlt:
featured: false
order: 3
draft: false
---

## The problem

Build a chessboard you can play against a computer using real pieces. The board makes the computer's moves itself, sliding pieces from underneath the playing surface. It was the final project for RE 404 (Mechatronics Lab), built by a three-person team for about $375 in parts.

## What we built

- **CoreXY gantry.** Two NEMA 17 stepper motors drive a pair of GT2 belts in a CoreXY arrangement, the same layout many 3D printers use. Because the motors stay fixed on the frame, the moving carriage is light, so it can move quickly without losing precision. We also considered a SCARA arm but chose CoreXY because its kinematics are much simpler to implement in a semester.
- **Frame and mounts.** The frame is 20×20 mm V-slot aluminum extrusion, with V-slot wheels riding in the grooves. We designed the gantry carriages, motor corner mounts, and idler-pulley holders in CAD and 3D-printed them.
- **Piece handling.** A 200 N electromagnet on the carriage pulls the pieces across a foam-board playing surface. The pieces are 3D-printed with rare-earth magnets set into their bases. To avoid knocking over other pieces, they travel along the lines between squares instead of across them.
- **Electronics.** An Arduino Nano runs two A4988 stepper drivers set to quarter-step, a MOSFET driver for the electromagnet, limit switches for homing, and a multiplexer for reading piece-detection sensors. Everything runs from a 12 V supply.
- **Software.** It's written in C++ in the Arduino IDE. We started from an open-source Instructables chessboard project and adapted it to our hardware. The final program homes the gantry and waits for the player's move. It then checks the player's move and its own reply for legality, removes any captured piece, and makes the computer's move using a small minimax-based chess engine.

## My role

As team leader, I handled the mechanical design: the CoreXY gantry, the frame, and all of the 3D-printed mounts and carriages. I also did most of the low-level electronics, wiring the stepper drivers, electromagnet driver, limit switches, and sensor multiplexer to the Arduino. On a three-person team, one teammate led the software and the other handled documentation and some of the CAD. I also contributed heavily to the code.

## Outcome

- **Working:** gantry motion, homing, electromagnet piece movement, and a full game against the computer.
- **Not finished:** we bought reed switches to detect the player's moves automatically, but we ran out of time to wire and integrate them. In the final version, the player types their move in instead.

If we built it again, we'd:

- Wire the reed switches as a matrix instead of one per input, which would cut the wiring way down.
- Move the limit switches to the motors' home positions for faster calibration.
- Run the gantry wiring through a drag chain.
- Use a microcontroller with more I/O than the Nano.

## Stack / Tools

Arduino Nano, C++, NEMA 17 steppers and A4988 drivers, Autodesk Inventor, and 3D printing.
