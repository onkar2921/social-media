
import Card from "@/components/Card"
import About from "@/components/About"
import ProfileLayout from "@/components/ProfileLayout"
export default function page() {
  return (
    <>
    
  <ProfileLayout>
    
  <div className="w-full h-full">
                <Card>
                  <About></About>
                </Card>
              </div>
  </ProfileLayout>
            
    </>
  )
}
