import { SendIcon } from 'lucide-react'
import { Button } from '@radix-ui/themes'

const ApplyButton = ({job}) => {
    async function handleSubmit(){
        try{
            const response = await fetch(`/api/jobs/${job.id}/apply`);
            const data = await response.json();
            if(data.success){
                alert("Applied Successfully");
            }
            else{
                alert("Something went wrong");
            }
        }
        catch{

        }
    }

  return (
    <Button size= "3" onClick={handleSubmit}><SendIcon size = {16}/></Button>
  )
}

export default ApplyButton;