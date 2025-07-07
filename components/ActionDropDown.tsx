"use client";

import { Dialog } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useState } from "react";
import { Models } from "node-appwrite";
import { actionsDropdownItems } from "@/constants";
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";

const ActionDropDown = ({ file }: { file: Models.Document }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [action, setAction] = useState<ActionType | null>(null);

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DropdownMenu
                open={isDropDownOpen}
                onOpenChange={setIsDropDownOpen}
            >
                <DropdownMenuTrigger className="shad-no-focus">
                    <Image
                        src="/assets/icons/dots.svg"
                        height={34}
                        width={34}
                        alt="dots"
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className="max-w-[200px] truncate">
                        {file.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {actionsDropdownItems.map((actionItem) => (
                        <DropdownMenuItem
                            key={actionItem.value}
                            className="shad-dropdown-item"
                            onClick={() => {
                                setAction(actionItem);

                                if (
                                    action &&
                                    [
                                        "rename",
                                        "share",
                                        "delete",
                                        "details",
                                    ].includes(action.value)
                                ) {
                                    setIsModalOpen(true);
                                }
                            }}
                        >
                            {actionItem.value === "download" ? (
                                <Link
                                    href={constructDownloadUrl(
                                        file.bucketFileId
                                    )}
                                    download={file.name}
                                    className="flex items-center gap-2"
                                >
                                    <Image
                                        src={actionItem.icon}
                                        width={30}
                                        height={30}
                                        alt={actionItem.label}
                                    />
                                    {actionItem.label}
                                </Link>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={actionItem.icon}
                                        width={30}
                                        height={30}
                                        alt={actionItem.label}
                                    />
                                    {actionItem.label}
                                </div>
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </Dialog>
    );
};

export default ActionDropDown;
