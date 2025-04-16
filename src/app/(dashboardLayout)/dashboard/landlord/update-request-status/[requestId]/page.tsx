import UpdateRequestStatusForm from "@/components/modules/landlord/UpdateRequestStatusForm ";

const UpdateRequestStatusPage = async ({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) => {
  const { requestId } = await params;

  return (
    <div className="flex justify-center items-center">
      <UpdateRequestStatusForm requestId={requestId} />
    </div>
  );
};

export default UpdateRequestStatusPage;
