import React, { useState } from 'react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const workoutPlan = {
  Monday: {
    focus: 'Chest + Triceps',
    type: 'Strength',
    exercises: [
      { name: 'Bench Press', sets: '4', reps: '8–12' },
      { name: 'Incline Dumbbell Press', sets: '3', reps: '10' },
      { name: 'Chest Fly', sets: '3', reps: '12' },
      { name: 'Dips', sets: '3', reps: 'max' },
      { name: 'Tricep Pushdown', sets: '3', reps: '12' },
      { name: 'Overhead Tricep Extension', sets: '3', reps: '10' }
    ]
  },
  Tuesday: {
    focus: 'Back + Biceps',
    type: 'Strength',
    exercises: [
      { name: 'Lat Pulldown', sets: '4', reps: '10' },
      { name: 'Seated Cable Row', sets: '3', reps: '10' },
      { name: 'Deadlift', sets: '3', reps: '6–8' },
      { name: 'Barbell Curl', sets: '3', reps: '10' },
      { name: 'Hammer Curl', sets: '3', reps: '12' }
    ]
  },
  Wednesday: {
    focus: 'Legs',
    type: 'Strength',
    exercises: [
      { name: 'Squats', sets: '4', reps: '8–10' },
      { name: 'Leg Press', sets: '3', reps: '12' },
      { name: 'Lunges', sets: '3', reps: '10 (each leg)' },
      { name: 'Leg Curl', sets: '3', reps: '12' },
      { name: 'Calf Raises', sets: '4', reps: '15' }
    ]
  },
  Thursday: {
    focus: 'Shoulders + Abs',
    type: 'Strength/Core',
    exercises: [
      { name: 'Shoulder Press', sets: '4', reps: '10' },
      { name: 'Lateral Raises', sets: '3', reps: '12' },
      { name: 'Rear Delt Fly', sets: '3', reps: '12' },
      { name: 'Shrugs', sets: '3', reps: '12' },
      { name: 'Plank', sets: '3', reps: '30–60 sec' },
      { name: 'Leg Raises', sets: '3', reps: '15' }
    ]
  },
  Friday: {
    focus: 'Full Body + Cardio',
    type: 'Endurance/Cardio',
    exercises: [
      { name: 'Burpees', sets: '3', reps: '15' },
      { name: 'Push-ups', sets: '3', reps: 'max' },
      { name: 'Pull-ups', sets: '3', reps: 'max' },
      { name: 'Jump Rope', sets: '1', reps: '5–10 min' },
      { name: 'Running/Cycling', sets: '1', reps: '15–20 min' }
    ]
  },
  Saturday: {
    focus: 'Active Recovery',
    type: 'Recovery',
    exercises: [
      { name: 'Light Jog/Walk', sets: '1', reps: '20 min' },
      { name: 'Stretching/Yoga', sets: '1', reps: '15–20 min' }
    ]
  },
  Sunday: {
    focus: 'Rest',
    type: 'Recovery',
    exercises: [
      { name: 'Complete rest', sets: '-', reps: '-' }
    ]
  }
};

const Schedule = () => {
  const [activeDay, setActiveDay] = useState('Monday');
  const dayPlan = workoutPlan[activeDay];

  return (
    <section id="schedule" className="py-32 max-md:py-20 bg-bgTertiary">
      <div className="w-full max-w-[1400px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] uppercase tracking-tight bg-gradient-to-br from-white to-textMuted text-transparent bg-clip-text">Exercise Days</h2>
          <p className="mt-4 text-lg text-textSecondary">Your weekly workout routine broken down day by day.</p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between overflow-x-auto gap-4 mb-12 pb-4 scrollbar-thin scrollbar-thumb-accentPrimary">
            {daysOfWeek.map((day) => (
              <button key={day} onClick={() => setActiveDay(day)}
                className={`px-8 py-4 rounded-full text-base font-semibold whitespace-nowrap transition-all border ${activeDay === day ? 'bg-accentPrimary text-black border-accentPrimary shadow-[0_0_15px_rgba(204,255,0,0.3)]' : 'bg-bgSecondary text-textSecondary border-glassBorder hover:bg-glassBorder hover:text-white'}`}>
                {day}
              </button>
            ))}
          </div>
          
          <div className="bg-bgPrimary p-8 rounded-2xl border border-glassBorder shadow-2xl">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-glassBorder max-md:flex-col max-md:items-start max-md:gap-4">
              <div>
                <h3 className="text-3xl font-heading font-bold text-white mb-2">{dayPlan.focus}</h3>
                <span className="text-textSecondary font-semibold">Day {daysOfWeek.indexOf(activeDay) + 1} Routine</span>
              </div>
              <span className="px-5 py-2 bg-white/5 rounded-lg text-sm uppercase tracking-wider text-accentPrimary font-bold">
                {dayPlan.type}
              </span>
            </div>

            <div className="grid gap-4">
              {dayPlan.exercises.map((exercise, idx) => (
                <div key={idx} className="flex max-md:flex-col max-md:items-start items-center justify-between bg-bgSecondary p-6 rounded-xl transition-all hover:-translate-y-1 hover:border-accentPrimary/40 border border-transparent hover:shadow-lg">
                  <div className="flex items-center gap-6">
                    <div className="text-textMuted/50 font-heading font-extrabold text-3xl select-none">{String(idx + 1).padStart(2, '0')}</div>
                    <h4 className="text-xl font-body font-semibold text-white">{exercise.name}</h4>
                  </div>
                  <div className="flex gap-10 max-md:mt-6 max-md:ml-[3.5rem] bg-bgPrimary/50 px-6 py-3 rounded-lg border border-glassBorder/50">
                    {exercise.sets !== '-' && (
                      <div className="text-center">
                        <div className="text-[0.7rem] uppercase tracking-widest text-textMuted mb-1 font-bold">Sets</div>
                        <div className="font-heading font-bold text-accentPrimary text-xl">{exercise.sets}</div>
                      </div>
                    )}
                    {exercise.reps !== '-' && (
                      <div className="text-center border-l border-glassBorder pl-10 max-md:pl-6">
                        <div className="text-[0.7rem] uppercase tracking-widest text-textMuted mb-1 font-bold">Reps / Time</div>
                        <div className="font-heading font-bold text-white text-xl">{exercise.reps}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Schedule;
