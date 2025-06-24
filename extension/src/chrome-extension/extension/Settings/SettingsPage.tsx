import { useEffect, useState } from "react";
import { Switch } from "../Components/Switch";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SiteLinkItem from "./SiteLinkItem";

function SettingsPage() {
  const [autoSave, setAutoSave] = useState(false);
  const [autoDisablePopup, setAutoDisablePopup] = useState(false);
  const [autoDisablePopupSites, setAutoDisablePopupSites] = useState("");
  const [siteLink, setSiteLink] = useState("");

  const { toast } = useToast();

  useEffect(function () {
    async function checkPopupEnabled() {
      const result = await chrome.storage.sync.get([
        "autoSaveWords",
        "autoDisablePopup",
      ]);
      setAutoSave(result.autoSaveWords || false);
      setAutoDisablePopup(result.autoDisablePopup || false);
    }
    checkPopupEnabled();
  }, []);

  useEffect(function () {
    async function getSites() {
      const result = await chrome.storage.local.get(["autoDisablePopupSites"]);
      if (result.autoDisablePopupSites) {
        setAutoDisablePopupSites(result.autoDisablePopupSites);
      } else {
        setAutoDisablePopupSites("");
        chrome.storage.local.set({ autoDisablePopupSites: "" });
      }
    }
    getSites();
  }, []);

  async function handleAddSite() {
    if (!siteLink) return;
    const result = await chrome.storage.local.get(["autoDisablePopupSites"]);
    const sites: string = result.autoDisablePopupSites;
    if (sites.split(",,,").includes(siteLink)) {
      toast({ title: "this site is already included" });
      return;
    }
    const newValue = result.autoDisablePopupSites + ",,," + siteLink;
    setAutoDisablePopupSites(newValue);
    setSiteLink("");
    chrome.storage.local.set({
      autoDisablePopupSites: newValue,
    });
  }

  async function handleRemoveSite(site: string) {
    const result = await chrome.storage.local.get(["autoDisablePopupSites"]);
    const sites: string = result.autoDisablePopupSites;
    const newValue = sites
      .split(",,,")
      .filter((s: string) => site !== s)
      .join(",,,");
    setAutoDisablePopupSites(newValue);
    chrome.storage.local.set({ autoDisablePopupSites: newValue });
  }
  async function handleEditSite(site: string) {
    handleRemoveSite(site);
    setSiteLink(site);
  }

  function handleAutoSaveChange() {
    setAutoSave((prev) => !prev);
    chrome.storage.sync.set({ autoSaveWords: !autoSave });
  }
  function handleAutoDisablePopupChange() {
    setAutoDisablePopup((prev) => !prev);
    if (!autoDisablePopup) {
      toast({
        title: "Add website links on which turjuman popup will be disabled",
      });
    }
    chrome.storage.sync.set({ autoDisablePopup: !autoDisablePopup });
  }

  return (
    <div className="text-[var(--foreground)] flex flex-col gap-5 pt-3">
      <div className="w-full flex justify-between items-center px-4">
        <h3 className="text-xl font-semibold">Auto Save</h3>
        <Switch onCheckedChange={handleAutoSaveChange} checked={autoSave} />
      </div>
      <div className="w-full flex justify-between items-center px-4">
        <h3 className="text-xl font-semibold">Auto Disable Popup</h3>
        <Switch
          onCheckedChange={handleAutoDisablePopupChange}
          checked={autoDisablePopup}
        />
      </div>
      {autoDisablePopup && (
        <div className="w-full flex flex-col items-center gap-2 px-4">
          <div className="flex justify-between w-full gap-10 mb-3">
            <input
              value={siteLink}
              onChange={(e) => setSiteLink(e.target.value)}
              type="text"
              placeholder="enter site domain"
              className="text-sm text-[var(--foreground)] font-inter flex-1 bg-[var(--input-background)] outline-none focus:ring-1 ring-[var(--ring)] p-1 border border-[var(--border)] rounded-[3px]"
            />
            <button className="hover:scale-[1.02] bg-[var(--background)] duration-300 transition-all">
              <PlusCircle onClick={handleAddSite} color="green" size={28} />
            </button>
          </div>
          {autoDisablePopupSites
            .split(",,,")
            .map(
              (site) =>
                site && (
                  <SiteLinkItem
                    edit={handleEditSite}
                    remove={handleRemoveSite}
                    site={site}
                  />
                )
            )}
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
