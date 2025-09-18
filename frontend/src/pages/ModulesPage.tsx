import React, { useEffect, useState } from 'react';
import {
  Lock,
  AlertTriangle,
  Database,
  Globe,
  Smartphone,
  Server,
  FileCheck,
  LucideIcon,
} from 'lucide-react';
import ModuleCard from '../components/ModuleCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import API_URL from '../config';

interface Module {
  icon: LucideIcon;
  title: string;
  description: string;
  progress: number;
  moduleId: number; // Add moduleId to link to the correct module
}

const ModulesPage: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [error, setError] = useState('');

useEffect(() => {
  const fetchModulesAndProgress = async () => {
    try {
      const modulesResponse = await fetch(`${API_URL}/api/Modules`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!modulesResponse.ok) {
        throw new Error('Failed to fetch module data');
      }

      const modulesData = await modulesResponse.json();

      const progressResponse = await fetch(`${API_URL}/api/Modules/Progress`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!progressResponse.ok) {
        throw new Error('Failed to fetch progress data');
      }

      const progressData = await progressResponse.json();

      const updatedModules: Module[] = modulesData.map((module: any) => {
        const progress =
          progressData.find((item: any) => item.moduleId === module.moduleId)?.progress || 0;
        const icons: Record<number, LucideIcon> = {
          1: Lock,
          2: AlertTriangle,
          3: Database,
          4: Globe,
          5: Smartphone,
          6: Server,
          7: FileCheck,
        };
        return {
          icon: icons[module.moduleId] || Lock,
          title: module.moduleName,
          description: module.description,
          progress,
          moduleId: module.moduleId,
        };
      });

      setModules(updatedModules);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong');
    }
  };

  fetchModulesAndProgress();
}, []);


  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Learning Modules</h1>
        {error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module) => (
              <ModuleCard key={module.moduleId} {...module} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ModulesPage;
