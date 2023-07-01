import { useState, useEffect } from 'react';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchWorkouts = async () => {
      const url = activeTab === 'all' ? '/api/workouts' : `/api/workouts?type=${activeTab}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [activeTab, dispatch, user]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className='filterSection'>
        <button
          className={activeTab === 'all' ? 'active' : ''}
          onClick={() => handleTabClick('all')}
        >
          All workouts
        </button>
        <button
          className={activeTab === 'A' ? 'active' : ''}
          onClick={() => handleTabClick('A')}
        >
          Day A
        </button>
        <button
          className={activeTab === 'B' ? 'active' : ''}
          onClick={() => handleTabClick('B')}
        >
          Day B
        </button>
        <button
          className={activeTab === 'C' ? 'active' : ''}
          onClick={() => handleTabClick('C')}
        >
          Day C
        </button>
      </div>
      <div className="home">
        <div className="workouts">
          {workouts && workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
        </div>
        <WorkoutForm />
      </div>
    </div>
  );
};

export default Home;
