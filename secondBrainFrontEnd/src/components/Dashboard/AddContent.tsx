import React, { useState } from "react";
import Button from "../../Ui/Button";
import { addContentService } from "../../Services/services";
import { toast } from "react-toastify";
import { fetchTagsService } from "../../Services/services";
const contentSchema = {
  type: "",
  link: "",
  title: "",
  tags: [],
};

const contentTypes = ['image', 'video', 'article', 'audio', 'document', 'link','tweet'];

interface AddContentProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  setIsContentAdded: any;
}

export function AddContent({ open, onClose, setIsContentAdded }: AddContentProps) {
  const [formData, setFormData] = useState(contentSchema);
  const [tagData,setTagData]=useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      tags: value.split(",").map((tag) => tag.trim()),
    }));
  };

  const fetchTagsData=async ()=>{
      try{
        const response = await fetchTagsService();
        console.log(response.data);
        setTagData(response.data)
      }
      catch(e:any)
      {
        
      }
  }


  const handleSubmit = async () => {
    onClose();
    setFormData(contentSchema);
    try {
      const response = await addContentService(formData);
      if (response.status === 200) {
        setIsContentAdded(true);
        toast.success("Content added successfully");
      }
    } catch (e: any) {
      toast.error(e.response.msg);
    }
  };

  return (
    <div
      onClick={onClose}
      className={`
            fixed inset-0 flex justify-center items-center transition-colors  top-0 left-0 right-0 z-50 ${
        open ? "visible bg-black/20 top-0 left-0 right-0" : "invisible"
      }`}
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
        bg-white rounded-xl shadow p-6 w-2/5 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }
        `}
      >
        <h2 className="text-xl font-bold mb-4">Add New Content</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-3 text-md">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="" disabled>
                Select a type
              </option>
              {contentTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-md font-medium text-gray-700 mb-3">Link</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter link"
              required
            />
          </div>
          <div>
            <label className="block text-md font-medium text-gray-700 mb-3">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter title"
              required
            />
          </div>
          <div>
            <label className="block text-md font-medium text-gray-700 mb-3">Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags.join(", ")}
              onChange={handleTagsChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter tags, separated by commas"
            />
          </div>
          <div className="flex justify-start space-x-2">
            <Button
              title="Cancel"
              styleType="primary"
              size="sm"
              onClick={onClose}
            />

            <Button
              title="Add Content"
              styleType="primary"
              size="sm"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
