import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import {
    convertFileSize,
    getFileTypesParams,
    getUsageSummary,
} from "@/lib/utils";
import { Models } from "node-appwrite";
import React from "react";

const Page = async ({ searchParams, params }: SearchParamProps) => {
    const type = ((await params)?.type as string) || "";

    const types = getFileTypesParams(type) as FileType[];

    const searchText = ((await searchParams)?.query as string) || "";
    const sort = ((await searchParams)?.sort as string) || "";

    const [files, totalSpace] = await Promise.all([
        getFiles({ types, searchText, sort }),
        getTotalSpaceUsed(),
    ]);

    const usageSummary = getUsageSummary(totalSpace);
    const currentUsage = usageSummary.find(
        (typeData) => typeData.title.toLowerCase() === type
    );

    return (
        <div className="page-container">
            <section className="w-full">
                <h1 className="h1 capitalize">{type}</h1>
                <div className="total-size-section">
                    <p className="body-1">
                        Total:{" "}
                        <span className="h5">
                            {currentUsage
                                ? convertFileSize(currentUsage.size)
                                : 0}
                        </span>
                    </p>
                    <div className="sort-container">
                        <p className="body-1 hidden sm:block text-light-200">
                            Sort By:
                        </p>
                        <Sort />
                    </div>
                </div>
            </section>
            {files.total > 0 ? (
                <section className="file-list">
                    {files.documents.map((file: Models.Document) => (
                        <Card key={file.$id} file={file} />
                    ))}
                </section>
            ) : (
                <p className="empty-list">No files uploaded</p>
            )}
        </div>
    );
};

export default Page;
