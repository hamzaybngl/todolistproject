package todolist;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.jasper.tagplugins.jstl.core.If;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.criterion.Restrictions;

import entities.Users;


@WebServlet("/login")
public class UserLoginAndRegister extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
  
    public UserLoginAndRegister() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String msg = request.getParameter("msg");
		if("register".equals(msg)) {
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			String email = request.getParameter("email");
			
			SessionFactory factory = new Configuration()
					.configure("hibernate.cfg.xml")
					.addAnnotatedClass(Users.class)
					.buildSessionFactory();

			Session session = factory.getCurrentSession();
			session.beginTransaction();
			Criteria cr = session.createCriteria(Users.class);
			cr.add(Restrictions.eq("username", username));
			cr.add(Restrictions.eq("userStatus", 1));
			List results = cr.list();
			if(results.size() == 0) {
				SessionFactory factory2 = new Configuration()
										.configure("hibernate.cfg.xml")
										.addAnnotatedClass(Users.class)
										.buildSessionFactory();
				
				Session session2 = factory2.getCurrentSession();
				try {			
					System.out.println("Creating new user object...");
					Users tempUser = new Users(username, password, email,1);
					
					session2.beginTransaction();
					System.out.println("Saving the user...");
					session2.save(tempUser);
					session2.getTransaction().commit();
					
					System.out.println("Done!");
					response.setContentType("text/plain");
					response.getWriter().write("true:Registration Successful!!");
				}
				finally {
					factory2.close();
				}

			}else {
				response.setContentType("text/plain");
				response.getWriter().write("false:This Username Is Already In Use");
			}
		
		}else if("login".equals(msg)) {
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			
			SessionFactory factory = new Configuration()
					.configure("hibernate.cfg.xml")
					.addAnnotatedClass(Users.class)
					.buildSessionFactory();

			Session session = factory.getCurrentSession();
			session.beginTransaction();
			Criteria cr = session.createCriteria(Users.class);
			cr.add(Restrictions.eq("username", username));
			cr.add(Restrictions.eq("password", password));
			cr.add(Restrictions.eq("userStatus", 1));
			List results = cr.list();
			for(Object object : results) {
				Users users = (Users)object;
				System.out.println(users.getUsername());
			}
			if(results.size() == 1) {
				HttpSession httpSession = request.getSession();
				httpSession.setAttribute("sessionUsername", username);
				response.setContentType("text/plain");
				response.getWriter().write("true:Login Succesful");
			}else if(results.size() == 0) {
				response.setContentType("text/plain");
				response.getWriter().write("false:Username or Password is Incorrect");
			}
		}else if("logout".equals(msg)) {
			HttpSession session = request.getSession(false);
			if (session != null) {
			    session.invalidate();
			    response.setContentType("text/plain");
				response.getWriter().write("true");
			} 
	            
			
		}
		
	}

}
