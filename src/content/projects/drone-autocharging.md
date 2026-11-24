---
kind: project
title: Automated Charging for Multi-Rotor Drones
summary: Senior capstone at Widener. I led a five-person team building a hexacopter meant to find a charging station, land on it using computer vision, and recharge without a person touching it.
role: Team Leader
started: 2022-09
ended: 2023-04
status: completed
links:
  # site:
  repo: https://github.com/Ethan-Matlack/WU-Team20-AutonomousDrone
tags: [ArduPilot, Python, OpenCV, PCB Design, Raspberry Pi, MAVLink, CAD, Gazebo]
# cover:
# coverAlt:
featured: true
order: 2
draft: false
---

## The problem

Battery life is what limits multi-rotor drones. The goal was a drone that, when its battery runs low, flies to a charging station, lands on it precisely, charges, and takes off again with no one stepping in. The project ran over two semesters on a budget of about $1,800 and had three parts: build the drone, write the vision-based landing, and design the charging station.

## What we built

- **Flight systems.** A hexacopter built on a carbon-fiber frame, running ArduPilot (ArduCopter) on a Pixhawk flight controller. It has a multiband RTK GPS with a survey-grade antenna, an external compass, a LiDAR rangefinder for altitude near the ground, and a Crossfire telemetry link. We picked the motors, propellers, and ESCs to give a thrust-to-weight ratio of about 2:1.
- **Custom structure.** We designed the landing gear, battery carrier, and electronics mounts in CAD and 3D-printed them, revising each part after testing. One example is a landing-gear joint we redesigned after the first version created a stress riser that cracked a carbon tube.
- **Vision landing.** A Raspberry Pi and camera run Python with OpenCV. The code masks each CMYK-painted panel of the landing base, fits lines to the panel edges, and works out the drone's offset and heading relative to the station. It then sends corrections to the flight controller over MAVLink.
- **Charging station.** A W-shaped base whose slopes guide the landing legs into its valleys, so the charging contacts line up even when the landing is off-center. We built a cardboard prototype first and then the final version in plywood and aluminum.
- **Onboard charger.** A custom PCB built around a TI BQ24600 charge controller, wired to the Raspberry Pi so the drone can stay powered while it charges and then decide when to take off.

## My role

TODO (Ethan): describe what you personally owned: e.g. flight systems, the crash investigation, CAD, coordinating the team. Keep it to what you did yourself.

As team leader I set the project plan and the flight-test plan, and I registered the drone with the FAA and handled airspace authorization for every flight in the controlled airspace over campus.

## Testing

We tested flight in stages, adding automation one step at a time: stabilize, then altitude hold, then loiter, then fully automated missions. That way each sensor and control loop was proven before the next one depended on it.

The first two outdoor flights ended in crashes. In the flight logs, the controller had commanded the violent pitch itself and there was no matching pilot input, which ruled out both pilot error and mechanical failure. A compass-interference test then showed magnetic interference above 100% across most of the throttle range. The cause was the power wiring sitting close to the flight controller's built-in compass. We added an external compass mounted well above the power electronics, retuned the PID loops indoors with deliberate disturbances, and then flew loiter and automated waypoint missions with no further problems.

## Outcome

- **Flight systems:** stable and reliable in every mode, including fully automated missions.
- **Charging base:** the W-shape reliably guided the drone into place.
- **Vision landing:** worked in Gazebo/ROS simulation and in camera tests off the drone. Communication problems prevented full integration on the drone before the project ended.
- **Charging PCB:** the first board had a manufacturing short. A second board detected the battery correctly but never delivered charge, and the root cause wasn't found before the deadline.

So the full land-and-charge loop was never completed. The parts that worked, and the debugging that got them there, are what I took away from the project.

## Stack / Tools

ArduPilot (ArduCopter), Mission Planner, Pixhawk, Python, OpenCV, Pymavlink, Raspberry Pi, ROS and Gazebo, Autodesk Inventor, PCB design, 3D printing, and GitHub for both code and CAD.
