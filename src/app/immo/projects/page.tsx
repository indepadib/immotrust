'use client'; import React, { Suspense } from 'react';
import ProjectsContent from './ProjectsContent'; export default function ProjectsPage() { return ( <Suspense fallback={ <main className="min-h-screen bg-slate-50 pt-32 pb-40 flex items-center justify-center"> <div className="text-2xl font-black text-slate-300 uppercase italic animate-pulse"> Initialisation du Référentiel... </div> </main> }> <ProjectsContent /> </Suspense> );
}
