"use client";

import { FileSystem, type FileSystemItem } from "@/components/extend/file-system";

// Flat manifest — maps 1:1 from S3/R2 ListObjectsV2:
//   Contents[].Key          -> file.key / file.path
//   Contents[].Size         -> file.size
//   Contents[].LastModified -> file.updatedAt
//   Contents[].ETag         -> file.etag
//   CommonPrefixes[].Prefix -> folder.path
const items: FileSystemItem[] = [
  {
    kind: "file",
    key: "reports/attention.pdf",
    path: "reports/attention.pdf",
    contentType: "application/pdf",
    size: 2215244,
    createdAt: "2026-02-12T18:21:00Z",
    updatedAt: "2026-03-24T21:43:00Z",
    url: "/samples/attention.pdf",
  },
  // ...
];

export function DocumentsBrowser() {
  return (
    <div className="h-lvh flex">
      <FileSystem
        items={items}
        title="Documents"
        className="h-1/2 m-auto"
        getFileUrl={async (file) =>
          `/api/files/sign?key=${encodeURIComponent(file.key ?? file.path)}`
        }
        loadChildren={async ({ path, cursor }) => {
          const response = await fetch(
            `/api/files/list?prefix=${encodeURIComponent(path)}&cursor=${cursor ?? ""}`,
          );

          return response.json(); //
        }}
      />
    </div>
  );
}
