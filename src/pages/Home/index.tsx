import { useState } from 'react';
import { mockContributors } from '@/data/contributors';
import { Contributor, MusicType, ContributorAssignment } from '@/types';

import ContributorList from '../ContributorList';
import RoleAssignment from '../RoleAssignment';

type Page = 'HOME' | 'CONTRIBUTORS' | 'ROLE_ASSIGNMENT';

const Home = () => {
  const [contributors, setContributors] = useState<Contributor[]>(mockContributors);
  const [currentPage, setCurrentPage] = useState<Page>('HOME');
  const [roleAssignments, setRoleAssignments] = useState<{
    musicType: MusicType;
    assignments: ContributorAssignment[];
  }>({
    musicType: 'Instrumental',
    assignments: [],
  });

  if (currentPage === 'CONTRIBUTORS') {
    return (
      <ContributorList
        onBack={() => setCurrentPage('HOME')}
        contributors={contributors}
        setContributors={setContributors}
      />
    );
  }

  if (currentPage === 'ROLE_ASSIGNMENT') {
    return (
      <RoleAssignment
        onBack={() => setCurrentPage('HOME')}
        contributors={contributors}
        setContributors={setContributors}
        roleAssignments={roleAssignments}
        setRoleAssignments={setRoleAssignments}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center text-white">Contributor Management</h1>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contributors List Card */}
          <div onClick={() => setCurrentPage('CONTRIBUTORS')} className="group cursor-pointer">
            <div className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="p-8">
                <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                  Contributors List
                </h2>
                <p className="text-gray-400">
                  View and manage all contributors including artists, composers, producers, and
                  more.
                </p>
              </div>
            </div>
          </div>

          {/* Role Assignment Card */}
          <div onClick={() => setCurrentPage('ROLE_ASSIGNMENT')} className="group cursor-pointer">
            <div className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="p-8">
                <div className="w-14 h-14 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                  Role Assignment
                </h2>
                <p className="text-gray-400">
                  Manage and assign roles to contributors for different music projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
