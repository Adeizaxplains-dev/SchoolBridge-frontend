import {
  useEffect,
  useMemo,
  useState,
} from "react";

import useFees from "../../../hooks/useFees";
import useSchoolSetup from "../../../hooks/useSchoolSetup";

import SetupSkeleton from "../../../components/school-setup/SetupSkeleton";
import SetupEmptyState from "../../../components/school-setup/SetupEmptyState";

import FeeStructureHeader from "../../../components/school-setup/FeeStructureHeader";
import FeeStructureToolbar from "../../../components/school-setup/FeeStructureToolbar";
import FeeStructureSummary from "../../../components/school-setup/FeeStructureSummary";
import FeeStructureTable from "../../../components/school-setup/FeeStructureTable";

import FeeStructureModal from "../../../components/school-setup/FeeStructureModal";
import DeleteConfirmDialog from "../../../components/school-setup/DeleteConfirmDialog";


const INITIAL_FORM = {
  title: "",
  class: "",
  session: "",
  term: "",
  items: [
    {
      name: "",
      amount: "",
    },
  ],
};


const getId = (value) => {
  if (!value) return "";

  if (typeof value === "string") {
    return value;
  }

  return value._id || value.id || "";
};


const getLabel = (value, fallback = "") => {
  if (!value) return fallback;

  if (typeof value === "string") {
    return value;
  }

  return (
    value.name ||
    value.title ||
    value.label ||
    value.code ||
    fallback
  );
};


export default function FeeStructure() {
  const {
    loading,
    saving,
    deleting,
    error,
    feeStructures,
    createFee,
    updateFee,
    removeFee,
    refresh,
  } = useFees();


  const {
    getAcademicSessions,
    getClasses,
    getTerms,
  } = useSchoolSetup();


  const [structures, setStructures] = useState([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [selectedStructure, setSelectedStructure] = useState(null);

  const [formData, setFormData] = useState({
    ...INITIAL_FORM,
    items: [
      {
        name: "",
        amount: "",
      },
    ],
  });

  const [validationErrors, setValidationErrors] = useState({});


  /*
  =====================================================
  SCHOOL SETUP OPTIONS
  =====================================================
  */

  const [academicSessions, setAcademicSessions] = useState([]);
  const [classes, setClasses] = useState([]);
  const [terms, setTerms] = useState([]);

  const [setupLoading, setSetupLoading] = useState(true);
  const [setupError, setSetupError] = useState("");


  useEffect(() => {
    let mounted = true;

    const loadSetupOptions = async () => {
      try {
        setSetupLoading(true);
        setSetupError("");

        const [
          sessionResponse,
          classResponse,
          termResponse,
        ] = await Promise.all([
          getAcademicSessions(),
          getClasses(),
          getTerms(),
        ]);

        if (!mounted) return;

        setAcademicSessions(
          Array.isArray(sessionResponse?.academicSessions)
            ? sessionResponse.academicSessions
            : [],
        );

        setClasses(
          Array.isArray(classResponse?.classes)
            ? classResponse.classes
            : [],
        );

        setTerms(
          Array.isArray(termResponse?.terms)
            ? termResponse.terms
            : [],
        );
      } catch (err) {
        console.error(
          "Load fee structure setup options error:",
          err,
        );

        if (!mounted) return;

        setSetupError(
          err?.response?.data?.message ||
          err?.message ||
          "Unable to load classes, sessions and terms.",
        );
      } finally {
        if (mounted) {
          setSetupLoading(false);
        }
      }
    };

    loadSetupOptions();

    return () => {
      mounted = false;
    };
  }, [
    getAcademicSessions,
    getClasses,
    getTerms,
  ]);


  /*
  =====================================================
  SYNC DATA
  =====================================================
  */

  useEffect(() => {
    setStructures(feeStructures || []);
  }, [feeStructures]);


  /*
  =====================================================
  AUTO TOTAL CALCULATION
  =====================================================
  */

  const totalAmount = useMemo(() => {
    return formData.items.reduce(
      (total, item) =>
        total + (Number(item.amount) || 0),
      0,
    );
  }, [formData.items]);


  /*
  =====================================================
  FILTER STRUCTURES
  =====================================================
  */

  const filteredStructures = useMemo(() => {
    if (!search.trim()) {
      return structures;
    }

    const keyword = search.toLowerCase();

    return structures.filter((item) => {
      const classLabel = getLabel(
        item.class || item.className,
      );

      const sessionLabel = getLabel(
        item.session,
      );

      const termLabel = getLabel(
        item.term,
      );

      const titleLabel =
        item.title || "";

      return (
        classLabel
          .toLowerCase()
          .includes(keyword) ||
        sessionLabel
          .toLowerCase()
          .includes(keyword) ||
        termLabel
          .toLowerCase()
          .includes(keyword) ||
        titleLabel
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [structures, search]);


  /*
  =====================================================
  RESET FORM
  =====================================================
  */

  const resetForm = () => {
    setSelectedStructure(null);

    setFormData({
      ...INITIAL_FORM,
      items: [
        {
          name: "",
          amount: "",
        },
      ],
    });

    setValidationErrors({});
  };


  /*
  =====================================================
  CREATE
  =====================================================
  */

  const openCreate = () => {
    resetForm();
    setShowModal(true);
  };


  /*
  =====================================================
  EDIT
  =====================================================
  */

  const openEdit = (structure) => {
    setSelectedStructure(structure);

    const structureClass =
      structure.class || structure.className;

    const structureSession =
      structure.session;

    const structureTerm =
      structure.term;


    setFormData({
      title: structure.title || "",

      class: getId(structureClass),

      session: getId(structureSession),

      term: getId(structureTerm),

      items: structure.items?.length
        ? structure.items.map((item) => ({
            name: item.name || "",
            amount:
              item.amount !== undefined &&
              item.amount !== null
                ? String(item.amount)
                : "",
          }))
        : [
            {
              name: "",
              amount: "",
            },
          ],
    });

    setValidationErrors({});

    setShowModal(true);
  };


  /*
  =====================================================
  DELETE OPEN
  =====================================================
  */

  const openDelete = (structure) => {
    setSelectedStructure(structure);
    setShowDeleteDialog(true);
  };


  /*
  =====================================================
  FORM CHANGE
  =====================================================
  */

  const handleFormChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setValidationErrors((previous) => {
      const next = {
        ...previous,
      };

      delete next[field];

      return next;
    });
  };


  /*
  =====================================================
  FEE ITEM CHANGE
  =====================================================
  */

  const handleItemChange = (
    index,
    field,
    value,
  ) => {
    setFormData((previous) => ({
      ...previous,

      items: previous.items.map(
        (item, itemIndex) =>
          itemIndex === index
            ? {
                ...item,
                [field]: value,
              }
            : item,
      ),
    }));

    setValidationErrors((previous) => {
      const next = {
        ...previous,
      };

      delete next[`${field}-${index}`];

      return next;
    });
  };


  /*
  =====================================================
  ADD FEE ITEM
  =====================================================
  */

  const addFeeItem = () => {
    setFormData((previous) => ({
      ...previous,

      items: [
        ...previous.items,
        {
          name: "",
          amount: "",
        },
      ],
    }));
  };


  /*
  =====================================================
  REMOVE FEE ITEM
  =====================================================
  */

  const removeFeeItem = (index) => {
    setFormData((previous) => {
      if (previous.items.length <= 1) {
        return previous;
      }

      return {
        ...previous,

        items: previous.items.filter(
          (_, itemIndex) =>
            itemIndex !== index,
        ),
      };
    });


    setValidationErrors((previous) => {
      const next = {
        ...previous,
      };

      Object.keys(next).forEach((key) => {
        const match =
          key.match(/^(name|amount)-(\d+)$/);

        if (!match) {
          return;
        }

        const itemIndex =
          Number(match[2]);

        if (itemIndex === index) {
          delete next[key];
        }
      });

      return next;
    });
  };


  /*
  =====================================================
  VALIDATION
  =====================================================
  */

  const validateForm = () => {
    const errors = {};

    const title =
      typeof formData.title === "string"
        ? formData.title.trim()
        : "";

    if (!title) {
      errors.title =
        "Fee structure title is required";
    }


    if (!formData.class) {
      errors.class =
        "Class is required";
    }


    if (!formData.session) {
      errors.session =
        "Academic session is required";
    }


    if (!formData.term) {
      errors.term =
        "Term is required";
    }


    if (
      !Array.isArray(formData.items) ||
      formData.items.length === 0
    ) {
      errors.items =
        "At least one fee item is required";
    }


    formData.items.forEach(
      (item, index) => {
        const itemName =
          typeof item.name === "string"
            ? item.name.trim()
            : "";

        const amount =
          Number(item.amount);


        if (!itemName) {
          errors[`name-${index}`] =
            "Item name is required";
        }


        if (
          item.amount === "" ||
          item.amount === null ||
          item.amount === undefined ||
          Number.isNaN(amount) ||
          amount <= 0
        ) {
          errors[`amount-${index}`] =
            "Amount must be greater than zero";
        }
      },
    );


    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };


  /*
  =====================================================
  SAVE
  =====================================================
  */

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }


    const payload = {
      title: formData.title.trim(),

      class: formData.class,

      session: formData.session,

      term: formData.term,

      items: formData.items.map((item) => ({
        name: item.name.trim(),
        amount: Number(item.amount),
      })),

      totalAmount,
    };


    try {
      if (selectedStructure) {
        await updateFee(
          selectedStructure._id,
          payload,
        );
      } else {
        await createFee(payload);
      }


      setShowModal(false);

      resetForm();

      await refresh();
    } catch (err) {
      console.error(
        "Save fee structure error:",
        err,
      );
    }
  };


  /*
  =====================================================
  DELETE CONFIRM
  =====================================================
  */

  const confirmDelete = async () => {
    if (!selectedStructure) {
      return;
    }


    try {
      await removeFee(
        selectedStructure._id,
      );

      setShowDeleteDialog(false);

      setSelectedStructure(null);

      await refresh();
    } catch (err) {
      console.error(
        "Delete fee structure error:",
        err,
      );
    }
  };


  /*
  =====================================================
  LOADING STATE
  =====================================================
  */

  if (
    loading ||
    setupLoading
  ) {
    return <SetupSkeleton />;
  }


  /*
  =====================================================
  ERROR STATE
  =====================================================
  */

  if (
    error &&
    structures.length === 0
  ) {
    return (
      <SetupEmptyState
        title="Unable to load fee structures"
        description={error}
        actionLabel="Retry"
        onAction={refresh}
      />
    );
  }


  /*
  =====================================================
  SETUP ERROR
  =====================================================
  */

  if (
    setupError &&
    structures.length === 0
  ) {
    return (
      <SetupEmptyState
        title="Unable to load fee structure setup data"
        description={setupError}
        actionLabel="Retry"
        onAction={() => window.location.reload()}
      />
    );
  }


  /*
  =====================================================
  PAGE
  =====================================================
  */

  return (
    <div className="space-y-8">

      <FeeStructureHeader
        totalStructures={structures.length}
        onCreate={openCreate}
      />


      <FeeStructureToolbar
        search={search}
        setSearch={setSearch}
        onRefresh={refresh}
      />


      <FeeStructureSummary
        structures={structures}
      />


      <FeeStructureTable
        structures={filteredStructures}
        onEdit={openEdit}
        onDelete={openDelete}
      />


      <FeeStructureModal
        open={showModal}

        structure={selectedStructure}

        saving={saving}

        formData={formData}

        setFormData={setFormData}

        validationErrors={validationErrors}

        totalAmount={totalAmount}

        classes={classes}

        academicSessions={academicSessions}

        terms={terms}

        onFormChange={handleFormChange}

        onClose={() => {
          setShowModal(false);
          resetForm();
        }}

        onSave={handleSave}

        addFeeItem={addFeeItem}

        removeFeeItem={removeFeeItem}

        handleItemChange={handleItemChange}
      />


      <DeleteConfirmDialog
        open={showDeleteDialog}

        loading={deleting}

        title="Delete Fee Structure"

        message={
          selectedStructure
            ? `Are you sure you want to delete ${
                selectedStructure.title ||
                getLabel(
                  selectedStructure.class ||
                  selectedStructure.className,
                  "this fee structure",
                )
              }?`
            : "Delete this fee structure?"
        }

        onCancel={() => {
          setShowDeleteDialog(false);
          setSelectedStructure(null);
        }}

        onConfirm={confirmDelete}
      />

    </div>
  );
}