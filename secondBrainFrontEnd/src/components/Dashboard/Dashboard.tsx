import Navbar from "../Navbar/Navbar";
import Button from "../../Ui/Button";
import ShareIcon from "../../assets/ShareIcon";
import Plusicon from "../../assets/Plusicon";
import Sidebar from "./Sidebar";
import Card from "./Card";
import Documenticon from "../../assets/Documenticon";
import Twitter from "../../assets/Twitter";
import Video from "../../assets/Video";
import { useEffect, useState } from "react";
import { AddContent } from "./AddContent";
import { getContentService } from "../../Services/services";
import { toast } from "react-toastify";
import {deleteContentService} from '../../Services/services';
import ShareModal from "./ShareModal";


function Dashboard() {
  const [open, setOpen] = useState(false);
  const [contentData, setContentData] = useState([]);
  const [isContentAdded,setIsContentAdded]=useState(false);
  const [isShareOpened,setIsShareOpened] = useState(false);
  const [noofItems,setNoofItems]=useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getContentService();
        if (response.status === 200) {
          const itemsArray = response.data.content
          setContentData(itemsArray);
          setNoofItems(itemsArray.length);
        }
      } catch (e: any) {
        toast.error(e.response?.msg || "An error occurred");
      }
    };

    fetchData();
  }, [isContentAdded]);

  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video;
      case "tweet":
        return Twitter;
      case "document":
        return Documenticon;
      default:
        return Video;
    }
  };

  async function handleDelete(contentId:string)
  {
      try
      {
        const response = await deleteContentService(contentId)
        if(response.status==200)
        {
          setIsContentAdded(true);
        }
      }
      catch(e:any)
      {
        toast.error(e.response.msg);
      }
  }
  return (
      <>
      <AddContent open={open} onClose={() => setOpen(false)} setIsContentAdded={setIsContentAdded} />
      <ShareModal 
        isShareOpened ={isShareOpened}
        setIsShareOpened={setIsShareOpened}
        noofItems={noofItems}
        onClose={() => setIsShareOpened(false)}
      />
      <Navbar
        buttons={[
          <Button
            key="share"
            startIcon={<ShareIcon />}
            title="ShareBrain"
            styleType="primary"
            size="sm"
            onClick={() => {
              setIsShareOpened(true);
            }}
          />,
          <Button
            key="add"
            startIcon={<Plusicon />}
            title="Add Content"
            styleType="primary"
            size="sm"
            onClick={() => {
              setOpen(true);
            }}
          />,
        ]}
      />
    <div className="bg-gray-100">
      <div className="flex mt-20">
          <Sidebar />
        <div className="w-3/4 p-6">
          <h2 className="text-lg font-semibold mb-4">Dashboard Content</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentData.map((card:any, index) => (
              
              <Card
                key={index}
                icon={getIcon(card.type)}
                title={card.title}
                link={card.link}
                tags={card.tagsInfo.map((tag:any) => tag.title)}
                onDelete={()=>{handleDelete(card._id)}}
                onShare={() =>
                  console.log(`Share clicked on card ${index + 1}`)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
