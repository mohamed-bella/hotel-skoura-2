import { useRouter } from 'next/navigation'

/**
 * A utility function to navigate with loading spinner
 * @param path The path to navigate to
 */
export function navigateWithLoading(path: string) {
  // Use the global startNavigation function exposed by NavigationLoader
  if (typeof window !== 'undefined' && window.startNavigation) {
    window.startNavigation()
  }
  
  // Small delay to ensure the loading state is visible
  setTimeout(() => {
    // Use window.location for navigation instead of router.push
    // This ensures loading state is visible until the new page loads
    window.location.href = path
  }, 300)
}

/**
 * Hook to use the router with loading spinner
 */
export function useNavigationWithLoading() {
  const router = useRouter()
  
  const navigate = (path: string) => {
    // Use the global startNavigation function exposed by NavigationLoader
    if (typeof window !== 'undefined' && window.startNavigation) {
      window.startNavigation()
    }
    
    // Small delay to ensure the loading state is visible
    setTimeout(() => {
      router.push(path)
    }, 300)
  }
  
  return navigate
}