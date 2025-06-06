// import { createContext, useContext, useState, ReactNode, useLayoutEffect } from 'react'

// interface PurchaseContextType {
//     selectedCourse: string | null,
//     storeSessionCourseId: (courseId: string) => void
// }

// const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined)

// export const PurchaseProvider = ({ children }: { children: ReactNode }) => {
//     const [selectedCourse, setSelectedCourse] = useState<string | null>(null)


//     useLayoutEffect(() => {
//         setSelectedCourse(null)
//     }, [])

//     const storeSessionCourseId = (courseId: string) => {
//         try {
//             sessionStorage.setItem("courseId", courseId)
//             setSelectedCourse(courseId)
//         } catch (err) {
//             console.error('Failed to set courseId in sessionStorage:', err)
//         }
//     }

//     return (
//         <PurchaseContext.Provider value={{ selectedCourse, storeSessionCourseId }}>
//             {children}
//         </PurchaseContext.Provider>
//     )
// }

// export const usePurchaseCourse = () => {
//     const context = useContext(PurchaseContext)
//     if (context === undefined) {
//         throw new Error('usePurchaseCourse must be used within a PurchaseProvider')
//     }
//     return context
// }
