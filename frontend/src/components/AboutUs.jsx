import React from 'react';

const teamMembers = [
  {
    name: 'Alice Johnson',
    role: 'Frontend Developer',
    description: 'Passionate about building responsive web applications and UI/UX designs.',
    linkedin: 'https://www.linkedin.com/in/alice-johnson',
    github: 'https://github.com/alicejohnson',
    pfp: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Bob Smith',
    role: 'Backend Developer',
    description: 'Loves working with databases, APIs, and server-side logic.',
    linkedin: 'https://www.linkedin.com/in/bob-smith',
    github: 'https://github.com/bobsmith',
    pfp: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
  {
    name: 'Charlie Brown',
    role: 'Full Stack Developer',
    description: 'Enjoys creating end-to-end solutions and seamless integrations.',
    linkedin: 'https://www.linkedin.com/in/charlie-brown',
    github: 'https://github.com/charliebrown',
    pfp: 'https://randomuser.me/api/portraits/men/47.jpg',
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">About Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
            <img src={member.pfp} alt={member.name} className="w-24 h-24 rounded-full mb-4 shadow-md" />
            <h2 className="text-xl font-semibold text-gray-800">{member.name}</h2>
            <p className="text-gray-500 mb-2">{member.role}</p>
            <p className="text-gray-600 text-sm mb-4">{member.description}</p>
            <div className="flex gap-4">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">LinkedIn</a>
              <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900 font-medium">GitHub</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
