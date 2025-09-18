export const isAuthenticatedRoute = (pathname: string): boolean => {
    // Base authenticated routes
    const authenticatedRoutes = [
      '/modules', 
      '/quizzes', 
      '/profile', 
      '/dashboard',
      '/admin',
      '/org-admin'
    ];
    
    // Check for base routes
    if (authenticatedRoutes.includes(pathname)) return true;
    
    // Check for detail pages
    if (pathname.startsWith('/modules/') || pathname.startsWith('/quizzes/')) return true;
    
    return false;
  };