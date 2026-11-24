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
  paper: https://digitalwolfgram.widener.edu/digital/collection/p16069coll18/id/4106/rec/4
tags: [Python, OpenCV, ArduPilot, Raspberry Pi, MAVLink, CAD, Gazebo, ROS]
cover: ../../assets/projects/drone-autocharging-cover.jpg
coverCaption: The team sitting behind an in-progress version of the drone
featured: true
order: 2
draft: false
---

## The problem

Battery life is what limits multi-rotor drones. The goal was a drone that, when its battery runs low, flies to a charging station, lands on it precisely, charges, and takes off again with no one stepping in. The project ran over two semesters on a budget of about $1,800 and had three parts: build the drone, write the vision-based landing, and design the charging system.

## What we built

- **Flight systems.** A hexacopter built on a carbon-fiber frame, running ArduPilot (ArduCopter) on a Pixhawk flight controller. It has a multiband RTK GPS with a survey-grade antenna, an external compass, a LiDAR rangefinder for altitude near the ground, and a Crossfire telemetry link. We picked the motors, propellers, and ESCs to give a thrust-to-weight ratio of about 2:1.
- **Custom structure.** We designed the landing gear, battery carrier, and electronics mounts in CAD and 3D-printed them, revising each part after testing to reduce weight, increase strength, and improve ease-of-use and maintenance.
- **Vision landing.** A Raspberry Pi and camera run Python with OpenCV. The code masks each CMYK-painted panel of the landing base, fits lines to the panel edges, and works out the drone's offset and heading relative to the station. It then sends corrections to the flight controller over MAVLink.
- **Charging station.** A W-shaped base whose slopes guide the landing legs into its valleys, so the charging contacts line up even when the landing is off-center. We built a cardboard prototype first and then the final version in plywood and aluminum.
- **Onboard charger.** A custom PCB built around a TI BQ24600 charge controller, wired to the Raspberry Pi, which allows us to shut down or update the flight computer while the charging sequence completes.

## My role

As the team leader I was responsible for the project's overall plan and direction as well as budgeting, safety, and coordination with external parties. Beyond that, every team member had a technical responsibility that they were in charge of; for me that was flight systems (all the electrical, mechanical, and control systems that make the drone fly). I was also heavily involved in the code for the vision landing system.

## Testing

We tested flight in stages, adding automation one step at a time: stabilize, then altitude hold, then loiter, then fully automated missions. That way each sensor and control loop was proven before the next one depended on it.

The first two outdoor flights ended in crashes. This was pretty much expected, though, and we had substantial amounts of data logging in place to ensure we could learn from it. In the flight logs, the controller was dutifully responding to what it believed to be a valid commanded heading and there were no pilot inputs, so we quickly ruled out both pilot error and mechanical failure. After some indoor tests with the drone strapped to the ground we discovered substantial compass interference being caused by the close proximity of power wiring to the flight controller's built-in compass. We added an external compass mounted well above the power electronics, retuned the PID loops indoors with deliberate disturbances, and then flew loiter and automated waypoint missions with no further problems.

This type of testing continued for vision landing, where we slowly stacked on more and more autonomy while reviewing logged data for anomalies. In the end we had a fully built vision system that was able to issue landing corrections (in offset and heading) to the flight computer, but we ran out of time to get the communications fully working between the flight computer and the Raspberry Pi.

## Outcome

- **Flight systems:** Extremely stable and reliable in every mode, including fully automated missions. Tested in winds up to 20 mph and with significant external perturbations, and the PID loops maintained snappy responses with minimal overshoot (in our application, faster response at the expense of a bit of overshoot was preferable).
- **Charging base:** The W-shape reliably guided the drone into place, the spring-loaded contacts at the base of the drone made a very secure electrical connection, and the colors allowed for easy identification. We load tested the landing legs, contacts, and base charger on their own, separately from the onboard charging circuit, and that whole power path worked.
- **Vision landing:** Worked in Gazebo/ROS simulation and in camera tests off the drone. Communication problems between the flight controller and Raspberry Pi prevented full integration on the drone before the project ended.
- **Charging PCB:** This was the one weak link in the charging path. Unfortunately, while the board detected the battery correctly, the BQ24600 chip never initiated the charge, and the root cause wasn't found before the deadline.

So while the full fly-land-charge loop was never completed, I was still quite pleased with the results of the project given the exceptionally short time window we had for a project with this many ambitious goals. In the end, we were awarded Best Oral Presentation, and the project has now had at least two more years of iteration by other teams as they expand on our ideas for their capstones.

## Stack / Tools

ArduPilot (ArduCopter), Mission Planner, Pixhawk, Python, OpenCV, Pymavlink, Raspberry Pi, ROS and Gazebo, Autodesk Inventor, PCB design, 3D printing, and GitHub for both code and CAD (odd, I know).
