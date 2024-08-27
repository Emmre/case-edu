import React, { useState } from "react";
import { usePatients } from "../hooks/usePatients";
import CustomModal from "@/components/Modal/ListModal";
import { deletePatient, IPatient, updatePatient } from "@/store/patientSlice";
import { useRouter } from "next/router";
import CustomListItem from "@/components/List";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import {
  BoxStyled,
  ButtonStyled,
  TitleStyled,
  HeaderStyled,
} from "@/styles/global";
import withAuth from "@/hoc/withAuth";
import { useDispatch } from "react-redux";
import EditModal from "@/components/Modal/EditModal";

const PatientsPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const patients = usePatients();
  const { setUserCredentials } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenModal = (patient: IPatient) => {
    setIsModalOpen(true);
    setLoading(true);
    setTimeout(() => {
      setSelectedPatient(patient);
      setLoading(false);
    }, 2000);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    setUserCredentials(null);
    router.push("/");
  };

  const handleDelete = (patient: IPatient) => {
    dispatch(deletePatient(patient.id));
  };

  const handleEdit = (patient: IPatient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedPatient: IPatient) => {
    dispatch(updatePatient(updatedPatient));
    setIsEditModalOpen(false);
    setSelectedPatient(null);
  };

  return (
    <BoxStyled>
      <HeaderStyled>
        <TitleStyled variant="h4">Patients</TitleStyled>
        <Link href="/new-patient" passHref>
          <ButtonStyled variant="contained">Add New Patient</ButtonStyled>
        </Link>
        <ButtonStyled variant="contained" onClick={handleLogout}>
          Logout
        </ButtonStyled>
      </HeaderStyled>
      {patients.length > 0 ? (
        patients.map((patient) => (
          <CustomListItem
            key={patient.id}
            item={patient}
            title={patient.name}
            subtitle={`Age: ${patient.age}`}
            onButtonClick={handleOpenModal}
            hasDeleteIcon
            hasEditIcon
            onDeleteClick={() => handleDelete(patient)}
            onEditClick={() => handleEdit(patient)}
          />
        ))
      ) : (
        <p>No data available</p>
      )}
      <CustomModal
        open={isModalOpen}
        title="Details"
        item={selectedPatient}
        onClose={handleCloseModal}
        loading={loading}
      />
      <EditModal
        open={isEditModalOpen}
        patient={selectedPatient}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
      />
    </BoxStyled>
  );
};

export default withAuth(PatientsPage);
