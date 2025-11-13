// API Configuration
const API_BASE_URL = "http://localhost:8000/api/v1";

// Types
export interface SignupData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  canvas_api_key?: string;
  canvas_instance_url?: string;
  canvas_session_cookie?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    study_streak_days: number;
    dark_mode: boolean;
    email_notifications: boolean;
    push_notifications: boolean;
    study_reminders: boolean;
    deadline_alerts: boolean;
    created_at: string;
  };
  canvas_session_valid?: boolean;
  has_canvas_session?: boolean;
}

// Auth API
export const authAPI = {
  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Signup failed" }));
      throw new Error(error.detail || "Signup failed");
    }

    return response.json();
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Login failed" }));
      throw new Error(error.detail || "Incorrect email or password");
    }

    return response.json();
  },

  async logout(token: string): Promise<void> {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async getCurrentUser(token: string): Promise<AuthResponse["user"]> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user info");
    }

    return response.json();
  },

  async validateCanvasSession(token: string): Promise<{ is_valid: boolean; has_session: boolean; message: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/validate-canvas-session`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to validate Canvas session");
    }

    return response.json();
  },

  async updateCanvasSession(token: string, sessionCookie: string, canvasUrl?: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/auth/update-canvas-session`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        canvas_session_cookie: sessionCookie,
        canvas_instance_url: canvasUrl || "https://usflearn.instructure.com",
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Failed to update Canvas session" }));
      throw new Error(error.detail || "Failed to update Canvas session");
    }

    return response.json();
  },
};

// Token Management
export const tokenManager = {
  getToken(): string | null {
    return localStorage.getItem("access_token");
  },

  setToken(token: string): void {
    localStorage.setItem("access_token", token);
  },

  removeToken(): void {
    localStorage.removeItem("access_token");
  },

  getUser(): AuthResponse["user"] | null {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  setUser(user: AuthResponse["user"]): void {
    localStorage.setItem("user", JSON.stringify(user));
  },

  removeUser(): void {
    localStorage.removeItem("user");
  },

  clear(): void {
    this.removeToken();
    this.removeUser();
  },
};

// Types for Courses and Modules
export interface Course {
  id: number;
  canvas_id: string | null;
  user_id: number;
  code: string;
  name: string;
  instructor: string | null;
  term: string | null;
  progress: number;
  color: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface ModuleItem {
  name: string;
  url: string;
}

export interface Module {
  id: number;
  course_id: number;
  name: string;
  position: number;
  items: ModuleItem[];
}

// Courses API
export const coursesAPI = {
  async getCourses(activeOnly: boolean = true): Promise<Course[]> {
    const token = tokenManager.getToken();
    if (!token) {
      throw new Error("Not authenticated");
    }
    
    const url = `${API_BASE_URL}/courses/${activeOnly ? '?active_only=true' : ''}`;
    
    const response = await fetch(url, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }

    return response.json();
  },

  async getCourse(courseId: number): Promise<Course> {
    const token = tokenManager.getToken();
    if (!token) {
      throw new Error("Not authenticated");
    }
    
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch course");
    }

    return response.json();
  },
};

// Assignments API
export interface Assignment {
  id: number;
  user_id: number;
  title: string;
  course: string;
  course_id: number;
  due_date: string;
  type: string;
  priority: string;
  status: string;
  submitted: boolean;
  description?: string;
  points?: number;
  created_at: string;
  updated_at: string;
}

export const assignmentsAPI = {
  async getAssignments(courseId?: number): Promise<Assignment[]> {
    const token = tokenManager.getToken();
    if (!token) {
      throw new Error("Not authenticated");
    }
    
    const url = courseId 
      ? `${API_BASE_URL}/assignments/?course_id=${courseId}` 
      : `${API_BASE_URL}/assignments/`;
    
    const response = await fetch(url, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch assignments");
    }

    return response.json();
  },

  async getUpcomingAssignments(limit: number = 5): Promise<Assignment[]> {
    const assignments = await this.getAssignments();
    const now = new Date();
    
    // Filter to only pending/not submitted, has due date, AND not overdue
    return assignments
      .filter(a => {
        if (a.submitted || a.status !== "pending") return false;
        if (!a.due_date) return false; // Only assignments with specific due dates
        const dueDate = new Date(a.due_date);
        if (isNaN(dueDate.getTime())) return false; // Invalid date
        return dueDate >= now; // Only future assignments
      })
      .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())
      .slice(0, limit);
  },
  
  async getAllUpcomingAssignments(): Promise<Assignment[]> {
    const assignments = await this.getAssignments();
    const now = new Date();
    
    // Filter to only pending/not submitted, has due date, AND not overdue
    return assignments
      .filter(a => {
        if (a.submitted || a.status !== "pending") return false;
        if (!a.due_date) return false; // Only assignments with specific due dates
        const dueDate = new Date(a.due_date);
        if (isNaN(dueDate.getTime())) return false; // Invalid date
        return dueDate >= now; // Only future assignments
      })
      .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
  },
};

// Modules API
export const modulesAPI = {
  async getCourseModules(courseId: number): Promise<Module[]> {
    const token = tokenManager.getToken();
    if (!token) {
      throw new Error("Not authenticated");
    }
    
    const response = await fetch(`${API_BASE_URL}/modules/course/${courseId}`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch modules");
    }

    return response.json();
  },

  async getModule(moduleId: number): Promise<Module> {
    const token = tokenManager.getToken();
    if (!token) {
      throw new Error("Not authenticated");
    }
    
    const response = await fetch(`${API_BASE_URL}/modules/${moduleId}`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch module");
    }

    return response.json();
  },
};

// Flashcards API
export const flashcardsAPI = {
  async generateFromModule(moduleId: number, numCards: number, fileUrls?: string[]): Promise<{ flashcards: any[], module_name: string, count: number }> {
    const token = tokenManager.getToken();
    if (!token) {
      throw new Error("Not authenticated");
    }
    
    const response = await fetch(`${API_BASE_URL}/flashcards/generate`, {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        module_id: moduleId,
        num_cards: numCards,
        ...(fileUrls && fileUrls.length > 0 && { file_urls: fileUrls })
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Failed to generate flashcards" }));
      throw new Error(error.detail);
    }

    return response.json();
  },

  async generateQuizFromModule(moduleId: number, numQuestions: number, fileUrls?: string[]): Promise<{ questions: any[], module_name: string, count: number }> {
    const token = tokenManager.getToken();
    if (!token) {
      throw new Error("Not authenticated");
    }
    
    const response = await fetch(`${API_BASE_URL}/quizzes/generate`, {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        module_id: moduleId,
        num_questions: numQuestions,
        ...(fileUrls && fileUrls.length > 0 && { file_urls: fileUrls })
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Failed to generate quiz" }));
      throw new Error(error.detail);
    }

    return response.json();
  },

  async saveDeck(deckName: string, flashcards: any[], courseId: number, moduleId: number) {
    const token = tokenManager.getToken();
    if (!token) {
      throw new Error("Not authenticated");
    }
    
    const user = tokenManager.getUser();
    if (!user) {
      throw new Error("User not found");
    }

    // Create flashcard set
    const setResponse = await fetch(`${API_BASE_URL}/flashcards/sets`, {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: user.id,
        course_id: courseId,
        title: deckName,
        description: `AI-generated flashcards from module ${moduleId}`
      })
    });

    if (!setResponse.ok) {
      throw new Error("Failed to create flashcard set");
    }

    const set = await setResponse.json();

    // Add flashcards to the set
    for (const card of flashcards) {
      await fetch(`${API_BASE_URL}/flashcards`, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          set_id: set.id,
          user_id: user.id,
          course_id: courseId,
          question: card.question,
          answer: card.answer,
          difficulty: "medium"
        })
      });
    }

    return set;
  }
};

// Chat API for AI Tutor
export interface ChatResponse {
  message: string;
  role: string;
  references?: string[];
}

export const chatAPI = {
  async sendMessage(moduleId: number, message: string, selectedFiles: string[]): Promise<ChatResponse> {
    const token = tokenManager.getToken();
    if (!token) {
      throw new Error("Not authenticated");
    }

    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        module_id: moduleId,
        message,
        file_urls: selectedFiles
      })
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    return response.json();
  },

  async getChatHistory(moduleId: number, limit: number = 50): Promise<any[]> {
    const token = tokenManager.getToken();
    if (!token) {
      throw new Error("Not authenticated");
    }

    const response = await fetch(`${API_BASE_URL}/chat/history/${moduleId}?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch chat history");
    }

    return response.json();
  },

  async clearHistory(moduleId: number): Promise<void> {
    const token = tokenManager.getToken();
    if (!token) {
      throw new Error("Not authenticated");
    }

    const response = await fetch(`${API_BASE_URL}/chat/history/${moduleId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to clear chat history");
    }
  },

  // Active Recall
  async generateQuestion(moduleId: number, fileUrls: string[]): Promise<{ question: string }> {
    const token = tokenManager.getToken();
    if (!token) {
      throw new Error("Not authenticated");
    }

    const response = await fetch(`${API_BASE_URL}/chat/active-recall/question`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        module_id: moduleId,
        file_urls: fileUrls
      })
    });

    if (!response.ok) {
      throw new Error("Failed to generate question");
    }

    return response.json();
  },

  async gradeAnswer(
    question: string, 
    userAnswer: string, 
    moduleId: number, 
    fileUrls: string[], 
    difficulty: string
  ): Promise<{ score: number; feedback: string; correct_answer: string; passed: boolean }> {
    const token = tokenManager.getToken();
    if (!token) {
      throw new Error("Not authenticated");
    }

    const response = await fetch(`${API_BASE_URL}/chat/active-recall/grade`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question,
        user_answer: userAnswer,
        module_id: moduleId,
        file_urls: fileUrls,
        difficulty
      })
    });

    if (!response.ok) {
      throw new Error("Failed to grade answer");
    }

    return response.json();
  }
};


