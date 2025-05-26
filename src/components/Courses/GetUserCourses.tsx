'use client';
import { useGetCoursesQuery } from '@/services/public/publicCourseApi';
import React, { useState } from 'react';

const GetUserCourse = () => {
  const [title, setTitle] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'' | 'asc' | 'desc'>('');

  const { data, isLoading, error } = useGetCoursesQuery({ title, sortOrder });

  console.log("data",data);
  

  if (isLoading) return <p>Loading courses...</p>;
  if (error) return <p>Failed to load courses</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">All Courses</h1>

      <div className="my-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as '' | 'asc' | 'desc')}
          className="border p-2 rounded"
        >
          <option value="">No Sort</option>
          <option value="asc">Sort A-Z</option>
          <option value="desc">Sort Z-A</option>
        </select>
      </div>

      <ul>
        {data?.courses?.map((course: any) => (
          <li key={course._id} className="border-b py-2">
            {course.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetUserCourse;
