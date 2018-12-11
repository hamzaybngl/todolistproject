package todolist;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.criterion.Restrictions;

import entities.Todo;
import entities.Users;
import util.Tools;

/**
 * Servlet implementation class ToDoTransaction
 */
@WebServlet("/ToDoTransaction")
public class ToDoTransaction extends HttpServlet {
	private static final long serialVersionUID = 1L;
      
    public ToDoTransaction() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession httpSession = request.getSession();
     	String username = (String)httpSession.getAttribute("sessionUsername");
     	if(username != null) {
     		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");

    		String todoName = request.getParameter("toDoName");
    		String todoExp = request.getParameter("todoExp");
    		String msg = request.getParameter("msg");
    		
    		if("newToDo".equals(msg)) {
    			//New To Do
    			
    	     	Date todoDeadline = null;
    			try {
    				todoDeadline = formatter.parse(request.getParameter("toDoDeadline"));
    			} catch (ParseException e) {
    				e.printStackTrace();
    			}
    	     	int userId = Tools.getUserId(username);
    	       
    			SessionFactory factory = new Configuration()
    					.configure("hibernate.cfg.xml")
    					.addAnnotatedClass(Todo.class)
    					.buildSessionFactory();

    			Session session = factory.getCurrentSession();
    			
    			Todo tempToDo = new Todo();
    			tempToDo.setTodoName(todoName);
    			tempToDo.setTodoExp(todoExp);
    			tempToDo.setTodoDeadline(todoDeadline);
    			tempToDo.setTodoStatus(1);
    			tempToDo.setTodoUserFK(userId);
    			
    			session.beginTransaction();

    			System.out.println("Saving the to do");
    			session.save(tempToDo);
    			session.getTransaction().commit();
    			
    			response.setContentType("text/plain");
    			response.getWriter().write("true");
    			
    		}else if("updateToDo".equals(msg)) {
    			Date todoDeadline = null;
    			try {
    				todoDeadline = formatter.parse(request.getParameter("toDoDeadline"));
    			} catch (ParseException e) {
    				// TODO Auto-generated catch block
    				e.printStackTrace();
    			}
    			String todoId = request.getParameter("todoId");
    			SessionFactory factory = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Todo.class).buildSessionFactory();
    	   		Session session = factory.getCurrentSession();
    	   		session.beginTransaction();
    	   		
    	   		Todo todo = (Todo) session.get(Todo.class, Integer.parseInt(todoId));
    	   		todo.setTodoName(todoName);
    	   		todo.setTodoExp(todoExp);
    	   		todo.setTodoDeadline(todoDeadline);
    	   		session.save(todo);
    			session.getTransaction().commit();
    			
    			response.setContentType("text/plain");
    			response.getWriter().write("true");
    			
    		}else if("deleteToDo".equals(msg)) {
    			//Delete To Do 
    			
    			int toDoId = Integer.parseInt(request.getParameter("todoID"));
    			SessionFactory factory = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Todo.class).buildSessionFactory();
    	   		Session session = factory.getCurrentSession();
    	   		session.beginTransaction();
    	   		
    	   		Todo todo = (Todo) session.get(Todo.class, toDoId);
    	   		if(todo != null) {
    	   			session.delete(todo);
	   		  		session.getTransaction().commit();
	   		  		
	    			response.setContentType("text/plain");
	    			response.getWriter().write("true");
    	   		}else {
    	   			response.setContentType("text/plain");
	    			response.getWriter().write("false");
    	   		}
    	   		
    			
    		}else if("completed".equals(msg)) {
    			
    			//Update To Do "Completed"(2) 
    			
    			int todoId = Integer.parseInt(request.getParameter("todoID"));
    			SessionFactory factory = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Todo.class).buildSessionFactory();
    	   		Session session = factory.getCurrentSession();
    	   		session.beginTransaction();
    	   		
    	   		Todo todo = (Todo) session.get(Todo.class, todoId);
    	   		todo.setTodoStatus(2);
    	   		session.save(todo);
    			session.getTransaction().commit();
    			
    			response.setContentType("text/plain");
    			response.getWriter().write("true");
    		
    		}else if("notcompleted".equals(msg)) {
    			//Update To Do "NotCompleted"(1) 
    			
    			int toDoId = Integer.parseInt(request.getParameter("todoID"));
    			SessionFactory factory = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Todo.class).buildSessionFactory();
    	   		Session session = factory.getCurrentSession();
    	   		session.beginTransaction();
    	   		
    	   		Todo todo = (Todo) session.get(Todo.class, toDoId);
    	   		todo.setTodoStatus(1);
    	   		session.save(todo);
    			session.getTransaction().commit();
    			
    			response.setContentType("text/plain");
    			response.getWriter().write("true");
    		}
     	}else {
     		String redirectURL = "login.jsp";
	 	    response.sendRedirect(redirectURL);
     	}
		
		
	}

}
