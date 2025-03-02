/* eslint-disable */

import React, { useState } from "react";
import Close from "../../assets/Close";
import Button from "../../Ui/Button";
import ShareIcon from "../../assets/ShareIcon";
import { toast } from "react-toastify";
import { shareBrainService } from "../../Services/services";
import ShareableLink from "./SharableLink";

interface ShareContentProps {
  isShareOpened: boolean;
  setIsShareOpened: (state: boolean) => void;
  noofItems: number;
  onClose: () => void;
}

function ShareModal({ isShareOpened, setIsShareOpened, noofItems, onClose }: ShareContentProps) {
  const [sharedLink, setSharedLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleShareBrain = async () => {
    try {
      setLoading(true);
      const response = await shareBrainService(true); 
      setSharedLink(`https://second-brain-backend-beta.vercel.app/api/v1/brain/${response.hash}`);
    } catch (error: any) {
      toast.error(error.response?.data || "Error sharing brain");
    } finally {
      setLoading(false);
    }
  };

  const handleDisableSharing = async () => {
    try {
      setLoading(true);
      await shareBrainService(false); 
      setSharedLink(null);
    } catch (error: any) {
      toast.error(error.response?.data || "Error disabling sharing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isShareOpened && (
        <div
          className="fixed inset-0 flex justify-center items-center transition-colors bg-black/20 z-50"
          onClick={onClose}
        >
          <div
            className="bg-white p-4 rounded-lg w-1/4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold">Share Your Second Brain</p>
              <span className="cursor-pointer" onClick={onClose}>
                <Close />
              </span>
            </div>

            <div className="mt-4">
              {!sharedLink &&(<p className="text-gray-600">
                Share your entire collection of notes, documents, videos, and tweets with others.
                They will be able to import your content into their own second brain.
              </p>)}
              <div className="text-center mt-6 flex justify-center">
                {sharedLink ? (
                  <ShareableLink 
                  sharedLink={sharedLink}
                  handleDisableSharing={handleDisableSharing}
                  />
                ) : (
                  <Button
                    title="Share Brain"
                    startIcon={<ShareIcon />}
                    styleType="primary"
                    size="sm"
                    onClick={handleShareBrain}
                  />
                )}
              </div>
              {!sharedLink&&( <p className="text-sm text-center font-medium mt-2">{noofItems} items will be shared</p>)}
             
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShareModal;
