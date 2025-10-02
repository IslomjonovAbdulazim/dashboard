export interface Translations {
  // Auth
  auth: {
    loginTitle: string;
    loginDescription: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    signIn: string;
    signingIn: string;
    loginSuccess: string;
    loginFailed: string;
    emailValidation: string;
    passwordRequired: string;
    sessionExpired: string;
    signedOutSuccess: string;
  };
  
  // Navigation
  nav: {
    teamName: string;
    planName: string;
    general: string;
    overview: string;
    payments: string;
    users: string;
    learningCenters: string;
    contentManagement: string;
    courses: string;
    lessons: string;
    words: string;
    userManagement: string;
  };
  
  // Common
  common: {
    cancel: string;
    continue: string;
    create: string;
    creating: string;
    edit: string;
    delete: string;
    save: string;
    saving: string;
    loading: string;
    actions: string;
    status: string;
    active: string;
    inactive: string;
    created: string;
    goBack: string;
    backToHome: string;
    openMenu: string;
    reset: string;
    clearFilters: string;
    filter: string;
    search: string;
    view: string;
    toggleColumns: string;
    noResultsFound: string;
    selected: string;
    rowsPerPage: string;
    page: string;
    of: string;
    goToFirstPage: string;
    goToPreviousPage: string;
    goToNextPage: string;
    goToLastPage: string;
    goToPage: string;
  };
  
  // Error pages
  errors: {
    forbidden: {
      title: string;
      message: string;
    };
    general: {
      title: string;
      message: string;
    };
    notFound: {
      title: string;
      message: string;
    };
    unauthorized: {
      title: string;
      message: string;
    };
    serverError: string;
  };
  
  // Learning Centers
  learningCenters: {
    title: string;
    description: string;
    noResults: string;
    noResultsDescription: string;
    totalActive: string;
    create: {
      title: string;
      description: string;
      centerName: string;
      centerNamePlaceholder: string;
      phoneNumber: string;
      phoneNumberPlaceholder: string;
      students: string;
      teachers: string;
      groups: string;
      paidSubscription: string;
      paidSubscriptionDescription: string;
      createButton: string;
      successMessage: string;
      errorMessage: string;
    };
    edit: {
      title: string;
      description: string;
      successMessage: string;
      errorMessage: string;
    };
    table: {
      center: string;
      contact: string;
      limits: string;
      payment: string;
      studentsLimit: string;
      teachersLimit: string;
      groupsLimit: string;
      paidPlan: string;
      freePlan: string;
      uploadLogo: string;
      makeFree: string;
      makePaid: string;
      deactivate: string;
      deactivateConfirm: string;
      deactivateMessage: string;
      paymentToggleSuccess: string;
      paymentToggleError: string;
      deactivateSuccess: string;
      deactivateError: string;
    };
    uploadLogo: {
      title: string;
      description: string;
      successMessage: string;
      errorMessage: string;
      invalidFormat: string;
      fileSizeError: string;
    };
  };
  
  // User Management
  userManagement: {
    title: string;
    description: string;
    noResults: string;
    noResultsDescription: string;
    activeAdmins: string;
    create: {
      title: string;
      description: string;
      fullName: string;
      fullNamePlaceholder: string;
      phoneNumber: string;
      phoneNumberPlaceholder: string;
      phoneDescription: string;
      role: string;
      roleDescription: string;
      learningCenter: string;
      learningCenterPlaceholder: string;
      learningCenterDescription: string;
      createButton: string;
      successMessage: string;
      errorMessage: string;
    };
    edit: {
      successMessage: string;
      errorMessage: string;
    };
    table: {
      admin: string;
      learningCenter: string;
      centerFallback: string;
      activate: string;
      deleteConfirm: string;
      deleteMessage: string;
      deleteSuccess: string;
      deleteError: string;
      statusSuccess: string;
      statusError: string;
    };
  };
  
  // Content Management
  contentManagement: {
    courses: {
      title: string;
      description: string;
      noResults: string;
      noResultsDescription: string;
      totalLessons: string;
      create: {
        title: string;
        description: string;
        courseTitle: string;
        courseTitlePlaceholder: string;
        courseDescription: string;
        courseDescriptionPlaceholder: string;
        learningCenter: string;
        learningCenterPlaceholder: string;
        createButton: string;
        successMessage: string;
        errorMessage: string;
      };
      edit: {
        successMessage: string;
        errorMessage: string;
      };
      table: {
        course: string;
        learningCenter: string;
        centerFallback: string;
        viewLessons: string;
        deleteConfirm: string;
        deleteMessage: string;
        deleteSuccess: string;
        deleteError: string;
      };
    };
    lessons: {
      create: {
        successMessage: string;
        errorMessage: string;
      };
      edit: {
        successMessage: string;
        errorMessage: string;
      };
      delete: {
        successMessage: string;
        errorMessage: string;
      };
    };
    words: {
      create: {
        successMessage: string;
        errorMessage: string;
      };
      edit: {
        successMessage: string;
        errorMessage: string;
      };
      delete: {
        successMessage: string;
        errorMessage: string;
      };
    };
    media: {
      audioUploadSuccess: string;
      audioUploadError: string;
      imageUploadSuccess: string;
      imageUploadError: string;
    };
  };
  
  // Command menu
  commandMenu: {
    placeholder: string;
    noResults: string;
    theme: string;
    light: string;
    dark: string;
    system: string;
  };

  // General messages
  messages: {
    noChanges: string;
    contentNotModified: string;
  };
}

// Uzbek translations
export const uzbekTranslations: Translations = {
  auth: {
    loginTitle: "Super Admin Kirish",
    loginDescription: "Admin panelga kirish uchun ma'lumotlaringizni kiriting",
    email: "Email",
    emailPlaceholder: "admin@gmail.com",
    password: "Parol",
    passwordPlaceholder: "Parolni kiriting",
    signIn: "Kirish",
    signingIn: "Kirilmoqda...",
    loginSuccess: "Muvaffaqiyatli kirdingiz!",
    loginFailed: "Kirish xato. Iltimos, qaytadan urinib ko'ring.",
    emailValidation: "Iltimos, to'g'ri email manzilini kiriting",
    passwordRequired: "Parol talab qilinadi",
    sessionExpired: "Sessiya muddati tugagan!",
    signedOutSuccess: "Muvaffaqiyatli chiqdingiz",
  },
  
  nav: {
    teamName: "Edu Tizim Admin",
    planName: "Super Admin",
    general: "Umumiy",
    overview: "Umumiy Ko'rinish",
    payments: "To'lovlar",
    users: "Foydalanuvchilar",
    learningCenters: "Ta'lim Markazlari",
    contentManagement: "Kontent Boshqaruvi",
    courses: "Kurslar",
    lessons: "Darslar",
    words: "So'zlar",
    userManagement: "Admin Boshqaruvi",
  },
  
  common: {
    cancel: "Bekor qilish",
    continue: "Davom etish",
    create: "Yaratish",
    creating: "Yaratilmoqda...",
    edit: "Tahrirlash",
    delete: "O'chirish",
    save: "Saqlash",
    saving: "Saqlanmoqda...",
    loading: "Yuklanmoqda...",
    actions: "Amallar",
    status: "Holat",
    active: "Faol",
    inactive: "Nofaol",
    created: "Yaratilgan",
    goBack: "Orqaga",
    backToHome: "Bosh sahifaga",
    openMenu: "Menyuni ochish",
    reset: "Tozalash",
    clearFilters: "Filtrlarni tozalash",
    filter: "Filtrlash...",
    search: "Qidirish",
    view: "Ko'rish",
    toggleColumns: "Ustunlarni almashtirish",
    noResultsFound: "Hech narsa topilmadi.",
    selected: "tanlangan",
    rowsPerPage: "Sahifadagi qatorlar",
    page: "Sahifa",
    of: "dan",
    goToFirstPage: "Birinchi sahifaga o'tish",
    goToPreviousPage: "Oldingi sahifaga o'tish",
    goToNextPage: "Keyingi sahifaga o'tish",
    goToLastPage: "Oxirgi sahifaga o'tish",
    goToPage: "sahifaga o'tish",
  },
  
  errors: {
    forbidden: {
      title: "Ruxsat Berilmagan",
      message: "Ushbu resursni ko'rish uchun kerakli ruxsatga ega emassiz.",
    },
    general: {
      title: "Ups! Xatolik yuz berdi :')",
      message: "Noqulaylik uchun uzr so'raymiz. Iltimos, keyinroq qaytadan urinib ko'ring.",
    },
    notFound: {
      title: "Ups! Sahifa Topilmadi!",
      message: "Siz qidirayotgan sahifa mavjud emas yoki o'chirilgan bo'lishi mumkin.",
    },
    unauthorized: {
      title: "Ruxsatsiz Kirish",
      message: "Ushbu resursga kirish uchun tegishli ma'lumotlar bilan tizimga kiring.",
    },
    serverError: "Ichki Server Xatosi!",
  },
  
  learningCenters: {
    title: "Ta'lim Markazlari",
    description: "Ta'lim muassasalarini keng qamrovli boshqarish",
    noResults: "Ta'lim markazlari topilmadi",
    noResultsDescription: "Hali hech qanday ta'lim markazi yaratilmagan. Boshlash uchun \"Ta'lim Markazi Qo'shish\" tugmasini bosing.",
    totalActive: "Jami Faol",
    create: {
      title: "Ta'lim Markazi Yaratish",
      description: "Tizimga belgilangan cheklovlar va konfiguratsiya bilan yangi ta'lim markazi qo'shing.",
      centerName: "Markaz Nomi",
      centerNamePlaceholder: "ABC Ta'lim Markazi",
      phoneNumber: "Telefon Raqami",
      phoneNumberPlaceholder: "+998901234567",
      students: "O'quvchilar",
      teachers: "O'qituvchilar",
      groups: "Guruhlar",
      paidSubscription: "Pullik Obuna",
      paidSubscriptionDescription: "Ushbu ta'lim markazi uchun pullik xususiyatlarni yoqing",
      createButton: "Markaz Yaratish",
      successMessage: "Ta'lim markazi \"{name}\" muvaffaqiyatli yaratildi",
      errorMessage: "Ta'lim markazini yaratishda xatolik",
    },
    edit: {
      title: "Ta'lim Markazini Tahrirlash",
      description: "\"{name}\" uchun konfiguratsiya va cheklovlarni yangilash.",
      successMessage: "Ta'lim markazi \"{name}\" muvaffaqiyatli yangilandi",
      errorMessage: "Ta'lim markazini yangilashda xatolik",
    },
    table: {
      center: "Markaz",
      contact: "Aloqa",
      limits: "Cheklovlar",
      payment: "To'lov",
      studentsLimit: "o'quvchi",
      teachersLimit: "o'qituvchi",
      groupsLimit: "guruh",
      paidPlan: "Pullik Reja",
      freePlan: "Bepul Reja",
      uploadLogo: "Logo Yuklash",
      makeFree: "Bepul Qilish",
      makePaid: "Pullik Qilish",
      deactivate: "Faolsizlantirish",
      deactivateConfirm: "Ta'lim Markazini Faolsizlantirish",
      deactivateMessage: "\"{name}\" ni faolsizlantirishga ishonchingiz komilmi? Bu amal bekor qilib bo'lmaydi.",
      paymentToggleSuccess: "To'lov holati muvaffaqiyatli yangilandi",
      paymentToggleError: "To'lov holatini yangilashda xatolik",
      deactivateSuccess: "Ta'lim markazi muvaffaqiyatli faolsizlantirildi",
      deactivateError: "Ta'lim markazini faolsizlantirishda xatolik",
    },
    uploadLogo: {
      title: "Logo Yuklash",
      description: "\"{name}\" uchun yangi logo yuklang. Qo'llab-quvvatlanadigan formatlar: JPEG, PNG, WebP (maksimal 5MB).",
      successMessage: "Logo muvaffaqiyatli yuklandi",
      errorMessage: "Logo yuklashda xatolik",
      invalidFormat: "Faqat JPEG, PNG va WebP rasmlar ruxsat etiladi",
      fileSizeError: "Fayl hajmi 5MB dan kam bo'lishi kerak",
    },
  },
  
  userManagement: {
    title: "Adminlar",
    description: "Admin foydalanuvchilarni va ularning kirish huquqlarini boshqarish",
    noResults: "Adminlar topilmadi",
    noResultsDescription: "Hali hech qanday admin yaratilmagan. Boshlash uchun \"Admin Qo'shish\" tugmasini bosing.",
    activeAdmins: "Faol Adminlar",
    create: {
      title: "Yangi Admin Yaratish",
      description: "Ta'lim markaziga yangi admin qo'shing. Ular o'zlarining ta'lim markazini to'liq boshqarish huquqiga ega bo'ladilar.",
      fullName: "To'liq Ism",
      fullNamePlaceholder: "To'liq ismni kiriting",
      phoneNumber: "Telefon Raqami",
      phoneNumberPlaceholder: "+998901234567",
      phoneDescription: "Mamlakat kodi bilan telefon raqamini kiriting (masalan, +998901234567)",
      role: "Rol",
      roleDescription: "Ta'lim markazini to'liq boshqarish huquqi",
      learningCenter: "Ta'lim Markazi",
      learningCenterPlaceholder: "Ta'lim markazini tanlang",
      learningCenterDescription: "Ushbu admin boshqaradigan ta'lim markazini tanlang",
      createButton: "Admin Yaratish",
      successMessage: "Foydalanuvchi muvaffaqiyatli yaratildi",
      errorMessage: "Foydalanuvchini yaratishda xatolik",
    },
    edit: {
      successMessage: "Admin muvaffaqiyatli yangilandi",
      errorMessage: "Adminni yangilashda xatolik",
    },
    table: {
      admin: "Admin",
      learningCenter: "Ta'lim Markazi",
      centerFallback: "Markaz #{id}",
      activate: "Faollashtirish",
      deleteConfirm: "Adminni O'chirish",
      deleteMessage: "{name} ni o'chirishga ishonchingiz komilmi? Bu amal bekor qilib bo'lmaydi.",
      deleteSuccess: "Foydalanuvchi muvaffaqiyatli o'chirildi",
      deleteError: "Foydalanuvchini o'chirishda xatolik",
      statusSuccess: "Foydalanuvchi holati muvaffaqiyatli yangilandi",
      statusError: "Foydalanuvchi holatini yangilashda xatolik",
    },
  },
  
  contentManagement: {
    courses: {
      title: "Kurslar",
      description: "Ta'lim kurslari va ularning kontentini boshqarish",
      noResults: "Kurslar topilmadi",
      noResultsDescription: "Hali hech qanday kurs yaratilmagan. Boshlash uchun \"Kurs Qo'shish\" tugmasini bosing.",
      totalLessons: "Jami Darslar",
      create: {
        title: "Yangi Kurs Yaratish",
        description: "Darslar va ta'lim kontentini boshqarish uchun yangi kurs qo'shing.",
        courseTitle: "Kurs Nomi *",
        courseTitlePlaceholder: "masalan, Ingliz tili asoslari",
        courseDescription: "Tavsif",
        courseDescriptionPlaceholder: "Kurs mazmuni va maqsadlarining qisqacha tavsifi...",
        learningCenter: "Ta'lim Markazi *",
        learningCenterPlaceholder: "Ta'lim markazini tanlang",
        createButton: "Kurs Yaratish",
        successMessage: "Kurs muvaffaqiyatli yaratildi",
        errorMessage: "Kurs yaratishda xatolik",
      },
      edit: {
        successMessage: "Kurs muvaffaqiyatli yangilandi",
        errorMessage: "Kursni yangilashda xatolik",
      },
      table: {
        course: "Kurs",
        learningCenter: "Ta'lim Markazi",
        centerFallback: "Markaz {id}",
        viewLessons: "Darslarni Ko'rish",
        deleteConfirm: "Kursni O'chirish",
        deleteMessage: "\"{title}\" ni o'chirishga ishonchingiz komilmi? Bu amal bekor qilib bo'lmaydi va barcha tegishli darslar va so'zlar ham o'chiriladi.",
        deleteSuccess: "Kurs muvaffaqiyatli o'chirildi",
        deleteError: "Kursni o'chirishda xatolik",
      },
    },
    lessons: {
      create: {
        successMessage: "Dars muvaffaqiyatli yaratildi",
        errorMessage: "Dars yaratishda xatolik",
      },
      edit: {
        successMessage: "Dars muvaffaqiyatli yangilandi",
        errorMessage: "Darsni yangilashda xatolik",
      },
      delete: {
        successMessage: "Dars muvaffaqiyatli o'chirildi",
        errorMessage: "Darsni o'chirishda xatolik",
      },
    },
    words: {
      create: {
        successMessage: "So'z muvaffaqiyatli yaratildi",
        errorMessage: "So'z yaratishda xatolik",
      },
      edit: {
        successMessage: "So'z muvaffaqiyatli yangilandi",
        errorMessage: "So'zni yangilashda xatolik",
      },
      delete: {
        successMessage: "So'z muvaffaqiyatli o'chirildi",
        errorMessage: "So'zni o'chirishda xatolik",
      },
    },
    media: {
      audioUploadSuccess: "Audio muvaffaqiyatli yuklandi",
      audioUploadError: "Audio yuklashda xatolik",
      imageUploadSuccess: "Rasm muvaffaqiyatli yuklandi",
      imageUploadError: "Rasm yuklashda xatolik",
    },
  },
  
  commandMenu: {
    placeholder: "Buyruq yozing yoki qidiring...",
    noResults: "Hech narsa topilmadi.",
    theme: "Mavzu",
    light: "Yorug'",
    dark: "Qorong'u",
    system: "Tizim",
  },

  messages: {
    noChanges: "Hech qanday o'zgarish aniqlanmadi",
    contentNotModified: "Kontent o'zgartirilmadi!",
  },
};

// English translations (current text for reference)
export const englishTranslations: Translations = {
  auth: {
    loginTitle: "Super Admin Login",
    loginDescription: "Enter your credentials to access the admin panel",
    email: "Email",
    emailPlaceholder: "admin@gmail.com",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    signIn: "Sign In",
    signingIn: "Signing in...",
    loginSuccess: "Login successful!",
    loginFailed: "Login failed. Please try again.",
    emailValidation: "Please enter a valid email address",
    passwordRequired: "Password is required",
    sessionExpired: "Session expired!",
    signedOutSuccess: "Signed out successfully",
  },
  
  nav: {
    teamName: "Zehnly Stats",
    planName: "Super Admin",
    general: "General",
    overview: "Overview",
    payments: "Payments",
    users: "Users",
    learningCenters: "Learning Centers",
    contentManagement: "Content Management",
    courses: "Courses",
    lessons: "Lessons",
    words: "Words",
    userManagement: "User Management",
  },
  
  common: {
    cancel: "Cancel",
    continue: "Continue",
    create: "Create",
    creating: "Creating...",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    saving: "Saving...",
    loading: "Loading...",
    actions: "Actions",
    status: "Status",
    active: "Active",
    inactive: "Inactive",
    created: "Created",
    goBack: "Go Back",
    backToHome: "Back to Home",
    openMenu: "Open menu",
    reset: "Reset",
    clearFilters: "Clear filters",
    filter: "Filter...",
    search: "Search",
    view: "View",
    toggleColumns: "Toggle columns",
    noResultsFound: "No results found.",
    selected: "selected",
    rowsPerPage: "Rows per page",
    page: "Page",
    of: "of",
    goToFirstPage: "Go to first page",
    goToPreviousPage: "Go to previous page",
    goToNextPage: "Go to next page",
    goToLastPage: "Go to last page",
    goToPage: "Go to page",
  },
  
  errors: {
    forbidden: {
      title: "Access Forbidden",
      message: "You don't have necessary permission to view this resource.",
    },
    general: {
      title: "Oops! Something went wrong :')",
      message: "We apologize for the inconvenience. Please try again later.",
    },
    notFound: {
      title: "Oops! Page Not Found!",
      message: "It seems like the page you're looking for does not exist or might have been removed.",
    },
    unauthorized: {
      title: "Unauthorized Access",
      message: "Please log in with the appropriate credentials to access this resource.",
    },
    serverError: "Internal Server Error!",
  },
  
  learningCenters: {
    title: "Learning Centers",
    description: "Comprehensive management of educational institutions",
    noResults: "No learning centers found",
    noResultsDescription: "No learning centers have been created yet. Click \"Add Learning Center\" to get started.",
    totalActive: "Total Active",
    create: {
      title: "Create Learning Center",
      description: "Add a new learning center to the system with specified limits and configuration.",
      centerName: "Center Name",
      centerNamePlaceholder: "ABC Learning Center",
      phoneNumber: "Phone Number",
      phoneNumberPlaceholder: "+998901234567",
      students: "Students",
      teachers: "Teachers",
      groups: "Groups",
      paidSubscription: "Paid Subscription",
      paidSubscriptionDescription: "Enable paid features for this learning center",
      createButton: "Create Center",
      successMessage: "Learning center \"{name}\" created successfully",
      errorMessage: "Failed to create learning center",
    },
    edit: {
      title: "Edit Learning Center",
      description: "Update the configuration and limits for \"{name}\".",
      successMessage: "Learning center \"{name}\" updated successfully",
      errorMessage: "Failed to update learning center",
    },
    table: {
      center: "Center",
      contact: "Contact",
      limits: "Limits",
      payment: "Payment",
      studentsLimit: "students",
      teachersLimit: "teachers",
      groupsLimit: "groups",
      paidPlan: "Paid Plan",
      freePlan: "Free Plan",
      uploadLogo: "Upload Logo",
      makeFree: "Make Free",
      makePaid: "Make Paid",
      deactivate: "Deactivate",
      deactivateConfirm: "Deactivate Learning Center",
      deactivateMessage: "Are you sure you want to deactivate \"{name}\"? This action cannot be undone.",
      paymentToggleSuccess: "Payment status updated successfully",
      paymentToggleError: "Failed to toggle payment status",
      deactivateSuccess: "Learning center deactivated successfully",
      deactivateError: "Failed to deactivate learning center",
    },
    uploadLogo: {
      title: "Upload Logo",
      description: "Upload a new logo for \"{name}\". Supported formats: JPEG, PNG, WebP (max 5MB).",
      successMessage: "Logo uploaded successfully",
      errorMessage: "Failed to upload logo",
      invalidFormat: "Only JPEG, PNG, and WebP images are allowed",
      fileSizeError: "File size must be less than 5MB",
    },
  },
  
  userManagement: {
    title: "Admins",
    description: "Manage admin users and their access permissions",
    noResults: "No admins found",
    noResultsDescription: "No admins have been created yet. Click \"Add Admin\" to get started.",
    activeAdmins: "Active Admins",
    create: {
      title: "Create New Admin",
      description: "Add a new admin to a learning center. They will have full access to manage their learning center.",
      fullName: "Full Name",
      fullNamePlaceholder: "Enter full name",
      phoneNumber: "Phone Number",
      phoneNumberPlaceholder: "+998901234567",
      phoneDescription: "Enter phone number with country code (e.g., +998901234567)",
      role: "Role",
      roleDescription: "Full access to learning center management",
      learningCenter: "Learning Center",
      learningCenterPlaceholder: "Select a learning center",
      learningCenterDescription: "Select the learning center this admin will manage",
      createButton: "Create Admin",
      successMessage: "User created successfully",
      errorMessage: "Failed to create user",
    },
    edit: {
      successMessage: "Admin updated successfully",
      errorMessage: "Failed to update admin",
    },
    table: {
      admin: "Admin",
      learningCenter: "Learning Center",
      centerFallback: "Center #{id}",
      activate: "Activate",
      deleteConfirm: "Delete Admin",
      deleteMessage: "Are you sure you want to delete {name}? This action cannot be undone.",
      deleteSuccess: "User deleted successfully",
      deleteError: "Failed to delete user",
      statusSuccess: "User status updated successfully",
      statusError: "Failed to update user status",
    },
  },
  
  contentManagement: {
    courses: {
      title: "Courses",
      description: "Manage educational courses and their content",
      noResults: "No courses found",
      noResultsDescription: "No courses have been created yet. Click \"Add Course\" to get started.",
      totalLessons: "Total Lessons",
      create: {
        title: "Create New Course",
        description: "Add a new course to manage lessons and educational content.",
        courseTitle: "Course Title *",
        courseTitlePlaceholder: "e.g., English Basics",
        courseDescription: "Description",
        courseDescriptionPlaceholder: "Brief description of the course content and objectives...",
        learningCenter: "Learning Center *",
        learningCenterPlaceholder: "Select a learning center",
        createButton: "Create Course",
        successMessage: "Course created successfully",
        errorMessage: "Failed to create course",
      },
      edit: {
        successMessage: "Course updated successfully",
        errorMessage: "Failed to update course",
      },
      table: {
        course: "Course",
        learningCenter: "Learning Center",
        centerFallback: "Center {id}",
        viewLessons: "View Lessons",
        deleteConfirm: "Delete Course",
        deleteMessage: "Are you sure you want to delete \"{title}\"? This action cannot be undone and will also delete all associated lessons and words.",
        deleteSuccess: "Course deleted successfully",
        deleteError: "Failed to delete course",
      },
    },
    lessons: {
      create: {
        successMessage: "Lesson created successfully",
        errorMessage: "Failed to create lesson",
      },
      edit: {
        successMessage: "Lesson updated successfully",
        errorMessage: "Failed to update lesson",
      },
      delete: {
        successMessage: "Lesson deleted successfully",
        errorMessage: "Failed to delete lesson",
      },
    },
    words: {
      create: {
        successMessage: "Word created successfully",
        errorMessage: "Failed to create word",
      },
      edit: {
        successMessage: "Word updated successfully",
        errorMessage: "Failed to update word",
      },
      delete: {
        successMessage: "Word deleted successfully",
        errorMessage: "Failed to delete word",
      },
    },
    media: {
      audioUploadSuccess: "Audio uploaded successfully",
      audioUploadError: "Failed to upload audio",
      imageUploadSuccess: "Image uploaded successfully",
      imageUploadError: "Failed to upload image",
    },
  },
  
  commandMenu: {
    placeholder: "Type a command or search...",
    noResults: "No results found.",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
  },

  messages: {
    noChanges: "No changes detected",
    contentNotModified: "Content not modified!",
  },
};